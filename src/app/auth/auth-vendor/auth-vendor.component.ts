import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VendorLoginService } from "../../service/vendor-login.service";

import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-auth-vendor',
  templateUrl: './auth-vendor.component.html',
  styleUrls: ['./auth-vendor.component.css']
})
export class AuthVendorComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private _vendorLoginService: VendorLoginService,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this._vendorLoginService.login({username: this.username, password: this.password}).subscribe(
      response => {
        if(response['response_code'] === 200)
        {
          localStorage.setItem('partyId', response['userData']['partyId']);
          localStorage.setItem('username', response['userData']['username']);
          localStorage.setItem('type', response['userData']['type']);
          this.router.navigate(['vendors/vendor-landing']);
        } else {
          this._flashMessagesService.show('Wrong Username or Password.', { cssClass: 'alert-danger text-center mt-2 ml-2 mr-2', timeout: 2000 });
        }
      }
    );
  }

}
