import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from "../config";

@Injectable()
export class CustomerLogoutService {

  httpHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  logout() {
    let desURL = config.RESTUrl + config.authUrl + config.customer_auth + config.customer_logout;
    this.http.post(desURL, {}, { headers: this.httpHeader }).subscribe(() => { });
  }

}
