import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VendorSignupService } from "../../service/vendor-signup.service";

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css']
})
export class VendorSignupComponent implements OnInit {

  user_name: string = '';
  vendor_password: string = '';
  confirm_password: string = '';

  constructor(
    private router: Router,
    private _vendorSignup: VendorSignupService,
  ) { }

  ngOnInit() {
  }

  clearData(){
    this.user_name = '';
    this.vendor_password = '';
    this.confirm_password = '';
  }

  onSubmit({ value, valid }: { value, valid: boolean }) {
    this._vendorSignup.doSignUp({ username: this.user_name, password: this.vendor_password }).subscribe(
      response => {
        if(response)
        {
          localStorage.setItem('partyId', response['userData']['partyId']);
          localStorage.setItem('username', response['userData']['username']);
          localStorage.setItem('type', response['userData']['type']);
          this.router.navigate(['vendors/vendor-landing']);
        }
      }
    );
  }

}
