import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { UserService } from './service/user.service';
import { MessageService } from './service/message.service';
import { VendorService } from "./service/vendor.service";
import { CustomerService } from './service/customer.service';

import { BuyersComponent } from './buyers/buyers.component';
import { VendorsComponent } from './vendors/vendors.component';
import { UserslistComponent } from './userslist/userslist.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatComponent } from './chat/chat.component';
import { AuthLandingComponent } from './auth/auth-landing/auth-landing.component';
import { AuthVendorComponent } from './auth/auth-vendor/auth-vendor.component';
import { AuthCustomerComponent } from './auth/auth-customer/auth-customer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VendorSignupComponent } from './auth/vendor-signup/vendor-signup.component';
import { VendorLandingComponent } from './vendor/vendor-landing/vendor-landing.component';
import { CustomerLandingComponent } from './customer/customer-landing/customer-landing.component';
import { VendorSignupService } from './service/vendor-signup.service';
import { VendorProfileComponent } from './vendor/vendor-profile/vendor-profile.component';
import { VendorProfileService } from './service/vendor-profile.service';
import { CustomerSignupComponent } from './auth/customer-signup/customer-signup.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";

import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { CustomerProfileService } from './service/customer-profile.service';
import { CustomerSignupService } from './service/customer-signup.service';
import { VendorLoginService } from './service/vendor-login.service';
import { AuthguardService } from './authguard.service';
import { CustomerLoginService } from './service/customer-login.service';
import { VendorLogoutService } from './service/vendor-logout.service';
import { CustomerLogoutService } from './service/customer-logout.service';
import { LandingComponent } from './landing/landing.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './service/categories.service';

import { MyDatePickerModule } from '../../node_modules/angular4-datepicker/src/my-date-picker';



import { DlDateTimePickerDateModule, DlDateTimePickerStringModule } from 'angular-bootstrap-datetimepicker';
import { JobRequestService } from './service/job-request.service';
import { CustomerAddressComponent } from './customer/customer-address/customer-address.component';
import { CustomerServiceInfoComponent } from './customer/customer-service-info/customer-service-info.component';
// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("190402761750594")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("94566853803-t2jkvro4r87h1i7ppb5ok73jldnine25.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    BuyersComponent,
    VendorsComponent,
    UserslistComponent,
    MessagesComponent,
    ChatComponent,
    AuthLandingComponent,
    AuthVendorComponent,
    AuthCustomerComponent,
    NotFoundComponent,
    VendorSignupComponent,
    VendorLandingComponent,
    CustomerLandingComponent,
    VendorProfileComponent,
    CustomerSignupComponent,
    CustomerProfileComponent,
    LandingComponent,
    CategoriesComponent,
    CustomerAddressComponent,
    CustomerServiceInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    FlashMessagesModule.forRoot(),
    SocialLoginModule,
    AsyncLocalStorageModule,
    DlDateTimePickerDateModule,
    DlDateTimePickerStringModule,
    MyDatePickerModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    CustomerProfileService, UserService, MessageService, VendorService, CustomerService, VendorSignupService, VendorProfileService, CustomerSignupService, VendorLoginService, AuthguardService, CustomerLoginService, VendorLogoutService, CustomerLogoutService, CategoriesService, JobRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
