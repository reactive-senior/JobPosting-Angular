import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from "../config";

@Injectable()
export class UserService {

  httpHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  getAllVendors(): Observable<any> {
    let desURL = config.RESTUrl + config.userUrl + config.getAllVendors;
    return this.http.get(desURL, {headers: this.httpHeader});
  }

  getAllBuyers(): Observable<any> {
    let desURL = config.RESTUrl + config.userUrl + config.getAllBuyers;
    return this.http.get(desURL, { headers: this.httpHeader });
  }

}
