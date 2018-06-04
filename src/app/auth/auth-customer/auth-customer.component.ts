import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { CustomerLoginService } from "../../service/customer-login.service";

import { JobRequestService } from '../../service/job-request.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-auth-customer',
  templateUrl: './auth-customer.component.html',
  styleUrls: ['./auth-customer.component.css']
})
export class AuthCustomerComponent implements OnInit {

  username: string = '';
  password: string = '';
  isLoading: boolean = true;
  
  constructor(
    private router: Router,
    private socialAuthService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private _customerLoginService: CustomerLoginService,
    private _jobRequestService: JobRequestService,
  ) { }
  
  ngOnInit() {
    if(localStorage.getItem('partyId') && localStorage.getItem('username') && localStorage.getItem('type'))
    {
      this.isLoading = true;
      this.saveJobPost();
    } else
    {
      this.isLoading = false;
    }
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this._customerLoginService.login({ username: userData.name, password: userData.id }).subscribe(
          response => {
            if (response['response_code'] === 200) {
              localStorage.setItem('partyId', response['userData']['partyId']);
              localStorage.setItem('username', response['userData']['username']);
              localStorage.setItem('type', response['userData']['type']);

              if(localStorage.getItem('isWithCategories') == 'true')
              {
                this.saveJobPost();
              } else
              this.router.navigate(['customers/customer-landing']);
            } else {
              this._flashMessagesService.show('Wrong Username or Password.', { cssClass: 'alert-danger text-center mt-2 ml-2 mr-2', timeout: 2000 });
            }
          }
        );
      }
    );
  }

  onSubmit(){
    this._customerLoginService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        if (response['response_code'] === 200) {
          localStorage.setItem('partyId', response['userData']['partyId']);
          localStorage.setItem('username', response['userData']['username']);
          localStorage.setItem('type', response['userData']['type']);

          if(localStorage.getItem('isWithCategories') == 'true')
            this.saveJobPost();
          else
            this.router.navigate(['customers/customer-landing']);
        } else {
          this._flashMessagesService.show('Wrong Username or Password.', { cssClass: 'alert-danger text-center mt-2 ml-2 mr-2', timeout: 2000 });
          
        }
      }
    );
  }


  saveJobPost(){
    let categories: Array<string> = JSON.parse(localStorage.getItem('categories'));
    let startDate: string = localStorage.getItem('startDate');
    let zipcode: string = localStorage.getItem('zipcode');
    let serviceTitle: string = localStorage.getItem('searchString');
    let customerId: string = localStorage.getItem('partyId');
    localStorage.removeItem('categories');
    localStorage.removeItem('startDate');
    localStorage.removeItem('zipcode');
    localStorage.removeItem('searchString');
    this._jobRequestService.saveJobRequest({customerId, serviceTitle, categories, startDate, zipcode}).subscribe(
      response=>{
        this.isLoading = false;
        localStorage.setItem('servicerequestkey', response['servicerequestkey']);
        this.router.navigate(['customers/customer-landing']);
      }
    );
  }

}
