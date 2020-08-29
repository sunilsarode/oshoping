import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  subscription1: Subscription;
  cart: any;

  category: string;
  constructor(private productService: ProductService, route: ActivatedRoute, private cartService: ShoppingCartService) {

    this.subscription = this.productService.getAll<Product>().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(param => {
      this.category = param.get('category');

      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category)
        : this.products;
    });

  }

  async ngOnInit() {
    // setting cart value
    this.subscription1 = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
        //console.log("I am cart "+ JSON.stringify(cart));

      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

}
