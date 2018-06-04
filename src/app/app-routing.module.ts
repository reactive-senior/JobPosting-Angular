import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivate } from '@angular/router';

import { ChatComponent } from "./chat/chat.component";
import { AuthLandingComponent } from './auth/auth-landing/auth-landing.component';
import { AuthCustomerComponent } from './auth/auth-customer/auth-customer.component';
import { AuthVendorComponent } from './auth/auth-vendor/auth-vendor.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VendorSignupComponent } from './auth/vendor-signup/vendor-signup.component';
import { VendorLandingComponent } from './vendor/vendor-landing/vendor-landing.component';
import { VendorProfileComponent } from './vendor/vendor-profile/vendor-profile.component';
import { CustomerSignupComponent } from './auth/customer-signup/customer-signup.component';
import { CustomerLandingComponent } from './customer/customer-landing/customer-landing.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { LandingComponent } from "./landing/landing.component";
import { AuthguardService as AuthGuard } from "./authguard.service";
import { CategoriesComponent } from './categories/categories.component';
import { CustomerAddressComponent } from './customer/customer-address/customer-address.component';
import { CustomerServiceInfoComponent } from './customer/customer-service-info/customer-service-info.component';

const routes: Routes = [
  // { path: '', redirectTo: 'landing', pathMatch: 'full' },

  { path: '', component: LandingComponent, pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent },
  {
    path: 'auth',
    
    children: [
      { path: '', component: AuthLandingComponent, pathMatch: 'full' },
      {
        path: 'vendor',
        children: [
          { path: '', component: AuthVendorComponent, pathMatch: 'full' },
          { path: 'signup', component: VendorSignupComponent },
        ]
      },
      {
        path: 'customer',
        children: [
          { path: '', component: AuthCustomerComponent, pathMatch: 'full' },
          { path: 'signup', component: CustomerSignupComponent },
        ]
      },
    ]
  },

  {
    path: 'vendors',
    canActivate: [AuthGuard],
    children: [
      { path: 'vendor-landing', component: VendorLandingComponent },
      { path: 'vendor-profile', component: VendorProfileComponent },
    ]
  },

  {
    path: 'customers',
    canActivate: [AuthGuard],
    children: [
      { path: 'customer-landing', component: CustomerLandingComponent },
      { path: 'customer-profile', component: CustomerProfileComponent },
      { path: 'customer-address', component: CustomerAddressComponent },
      { path: 'customer-request-list', component: CustomerServiceInfoComponent },
    ]
  },

  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
