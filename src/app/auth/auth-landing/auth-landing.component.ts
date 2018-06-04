import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.css']
})
export class AuthLandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('partyId'))
      if(localStorage.getItem('type') == '001')
        this.router.navigate(['/vendors/vendor-landing']);
      else
        this.router.navigate(['/customers/customer-landing']);
  }

}
