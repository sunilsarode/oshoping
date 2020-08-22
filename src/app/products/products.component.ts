import { switchMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
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

  category: string;
  constructor(private productService: ProductService, route: ActivatedRoute) {
    this.subscription = this.productService.getAll<Product>().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(param => {
      this.category = param.get('category');

      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category)
        : this.products;
    });

  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
