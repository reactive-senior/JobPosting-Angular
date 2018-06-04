import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from "../config";

@Injectable()
export class JobRequestService {

  httpHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  saveJobRequest(data: {customerId: string, serviceTitle: string, categories: Array<string>, startDate: string, zipcode: string}) {
    let desURL = config.RESTUrl + config.requestURL + config.saveServiceRequest;
    let service_info = {
      "customerID": data.customerId,
      "serviceTitle": data.serviceTitle,
      "categories": data.categories,
      "startDate": data.startDate,
      "zipcode": data.zipcode
    }
    return this.http.post(desURL, service_info, { headers: this.httpHeader });
  }

  getJobRequest(data: {servicerequestkey: string}){
    let desURL = config.RESTUrl + config.requestURL + config.getServiceRequest;
    let service_info = {
      "servicerequestkey": data.servicerequestkey
    }
    return this.http.post(desURL, service_info, { headers: this.httpHeader });
  }

  getJobByCustomer(data: {customerId: string}){
    let desURL = config.RESTUrl + config.requestURL + config.getJobByCustomerID;
    return this.http.post( desURL, data, {headers: this.httpHeader} );
  }

  upload(formData: any) {
    let desURL = config.RESTUrl + config.requestURL + config.serviceCustomerUploadUrl;
    return this.http.post(desURL, formData);
  }

  updateData(data: {servicerequestkey: string, update_info: {requestdescription: string, attatchment: any, addressId: any}}){
    let desURL = config.RESTUrl + config.requestURL + config.serviceInfoUpdate;
    let update_info = {
      servicerequestkey: data.servicerequestkey,
      update_info: data.update_info
    }
    return this.http.post(desURL, update_info, { headers: this.httpHeader });
  }

}
