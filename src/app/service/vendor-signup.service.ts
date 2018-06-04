import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from "../config";

@Injectable()
export class VendorSignupService {

  httpHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  doSignUp(data: { username: string, password: string }){
    let desURL = config.RESTUrl + config.authUrl + config.vendor_auth + config.vendor_signup;
    let vendor_info = {
      "username": data.username,
      "password": data.password
    }
    return this.http.post(desURL, vendor_info, { headers: this.httpHeader });
  }

}
