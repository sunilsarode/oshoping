import { Order } from './../../../shared/models/order';
import { AuthService } from './../../../shared/services/auth.service';
import { OrderService } from './../../../shared/services/order.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart')cart:ShoppingCart;
  shipping = {} as any;
  userSubscription: Subscription;
  userId: string;

  constructor(private orderSevice: OrderService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {

    const order = new Order(this.userId, this.shipping, this.cart);

    const result = await this.orderSevice.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
