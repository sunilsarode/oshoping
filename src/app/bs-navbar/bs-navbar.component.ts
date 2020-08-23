import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private authService: AuthService, private cartService: ShoppingCartService) {


  }

  async ngOnInit() {

    this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      // console.log(appUser);
    });
    const cart$ = await this.cartService.getCart();

    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (const productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }

    });
  }

  logout() {
    this.authService.logout();
  }

}
