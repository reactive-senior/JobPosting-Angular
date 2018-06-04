import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from "../config";
import { Vendor } from "../models/Vendor";

@Injectable()
export class VendorService {

  httpHeader: HttpHeaders;
  vendorData: Vendor = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    address: [],
    phone: [],
    email: [],
    company: {
      companyName: '',
      prefferedName: '',
      regNo: '',
      vatRegNo: '',
      insurance: '',
      qualifications: '',
      categories: ''
    }
  };

  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

}
