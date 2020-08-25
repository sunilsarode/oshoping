import { ShoppingCart } from './models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {

  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  }
  async addToCart(product: Product) {

    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item && item.payload.exportVal()) {

        item$.update({ quantity: item.payload.exportVal().quantity + 1 });
      } else {
        item$.set({ product: product, quantity: 1 });
      }
    });

  }


  async removeFromCart(product: Product) {

    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item && item.payload.exportVal()) {
        let quantity = item.payload.exportVal().quantity - 1;
        if (quantity === 0) {
          item$.remove();
        } else {
          item$.update({ quantity: quantity });
        }

      } else {//will think about this else block
        item$.set({ product: product, quantity: 0 });
      }
    });

  }

  async clearCart() {

    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {

    const cartId = localStorage.getItem('cartId');

    if (cartId) { return cartId }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }



}
