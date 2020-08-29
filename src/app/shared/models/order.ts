import { ShoppingCart } from './shopping-cart';
export class Order {

    datePlaced: number;
    public items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(i => {
            return {
                product: {// mapping details of shopping cart item to another product object
                    title: i.product.title,
                    imageUrl: i.product.imageUrl,
                    price: i.product.price
                },

                quantity: i.quantity,
                totalPrice: i.totalPrice,

            };
        });

    }
}
