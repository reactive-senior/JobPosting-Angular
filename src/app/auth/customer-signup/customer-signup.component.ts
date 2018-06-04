import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerSignupService } from "../../service/customer-signup.service";
import { JobRequestService } from '../../service/job-request.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css']
})
export class CustomerSignupComponent implements OnInit {

  user_name: string = '';
  customer_password: string = '';
  confirm_password: string = '';

  constructor(
    private router: Router,
    private socialAuthService: AuthService,
    private _customerSignup: CustomerSignupService,
    private _jobRequestService: JobRequestService,
  ) { }

  ngOnInit() {
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
        this._customerSignup.doSignUp({ username: userData.name, password: userData.id }).subscribe(
          response => {
            if (response) {
              localStorage.setItem('partyId', response['userData']['partyId']);
              localStorage.setItem('username', response['userData']['username']);
              localStorage.setItem('type', response['userData']['type']);

              if(localStorage.getItem('isWithCategories') == 'true')
              {
                this.saveJobPost();
                this.router.navigate(['customers/customer-landing']);
              } else
              this.router.navigate(['customers/customer-landing']);
            }
          }
        );
      }
    );
}

  onSubmit({ value, valid }: { value, valid: boolean }) {
    this._customerSignup.doSignUp({ username: this.user_name, password: this.customer_password }).subscribe(
      response => {
        if (response) {
          localStorage.setItem('partyId', response['userData']['partyId']);
          localStorage.setItem('partyId', response['userData']['username']);

          if(localStorage.getItem('isWithCategories') == 'true')
              {
                this.saveJobPost();
              } else
              this.router.navigate(['customers/customer-landing']);
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
        localStorage.setItem('servicerequestkey', response['servicerequestkey']);
        this.router.navigate(['customers/customer-landing']);
      }
    );
  }

}
