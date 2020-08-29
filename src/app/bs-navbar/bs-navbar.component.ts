import { ShoppingCart } from '../shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { AppUser } from '../shared/models/app-user';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private cartService: ShoppingCartService) {


  }

  async ngOnInit() {

    this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      // console.log(appUser);
    });
    this.cart$ =  (await this.cartService.getCart());
  }

  logout() {
    this.authService.logout();
  }

}
