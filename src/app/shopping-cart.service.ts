import { ShoppingCart } from './models/shopping-cart';
import { take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {

  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
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

  async addToCart(product: Product) {

    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item && item.payload.exportVal()) {

        item$.update({ quantity: item.payload.exportVal().quantity + 1 });
      } else {
        item$.set({ prduct: product, quantity: 1 });
      }
    });

  }


  async removeFromCart(product: Product) {

    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if (item && item.payload.exportVal()) {

        item$.update({ quantity: item.payload.exportVal().quantity - 1 });
      } else {
        item$.set({ prduct: product, quantity: 0 });
      }
    });

  }

  private async updateItemQuantity(product: Product, change: number) {

  }
}
