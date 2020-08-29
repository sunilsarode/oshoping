import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    items: ShoppingCartItem[] = []; // will use in html 
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        for (let productId in itemsMap) {

            let item = itemsMap[productId];

            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    public totolaItemCount() {
        let count = 0;
        for (const productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }

        return count;
    }

    public totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }

        return sum;
    }

    public getQuantity(product: Product) {
        //console.log(product)
        if (typeof this.itemsMap === 'undefined') {
            return 0;
        }
        // console.log("I am shoping cart"+this.shoppingCart);

        const item = this.itemsMap[product.key];
        // console.log("I am "+item);
        return item ? item.quantity : 0;
    }

}
