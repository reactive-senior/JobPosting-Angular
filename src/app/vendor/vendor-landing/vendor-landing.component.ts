import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VendorLogoutService } from "../../service/vendor-logout.service";

@Component({
  selector: 'app-vendor-landing',
  templateUrl: './vendor-landing.component.html',
  styleUrls: ['./vendor-landing.component.css']
})
export class VendorLandingComponent implements OnInit {

  constructor(
    private router: Router,
    private _vendorLogoutService: VendorLogoutService
  ) { }

  ngOnInit() {
  }

  doLogOut(){
    localStorage.clear();
    this._vendorLogoutService.logout();
    this.router.navigate(['/']);
  }

}
