import { SharedModule } from './../shared/shared.module';
import { AuthGuardService } from './../shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ProductsComponent } from './shopping/components/products/products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'prodducts', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },

    ])
  ]
})
export class ShoppingModule { }
