import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {

  }

  create(product) {
    this.db.list('/products').push(product);
  }

  // getAll() {
  //   return this.db.list('/products').snapshotChanges() as Observable<any>;

  // }

  getAll<T>() {
    return this.db.list<T>('/products').snapshotChanges().pipe(
      map(a =>
        a.map(p => {
          const value =  Object.assign({}, p.payload.val()) as any;
          value.key = p.key;
          return  value as T;
        }
        ))
    );
  }
  // we are using snapshot cause we are not creating more instances
  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
