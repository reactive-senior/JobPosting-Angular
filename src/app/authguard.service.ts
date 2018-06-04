import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';

import { config } from "./config";

@Injectable()
export class AuthguardService implements CanActivate{

  httpHeader: HttpHeaders;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }
  canActivate(): boolean {
    if(localStorage.getItem('partyId'))
      return true;
    else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
