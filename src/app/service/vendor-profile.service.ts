import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FlashMessagesService } from 'angular2-flash-messages';

import { config } from "../config";

@Injectable()
export class VendorProfileService {

  httpHeader: HttpHeaders;

  vendorProfile = {
    firstName: '',
    lastName: '',
    address: [],
    phone: [],
    email: [],
    company: {
      companyName: '',
      preferredName: '',
      regNumber: '',
      vatRegNumber: '',
      insurance: '',
      qualifications: '',
      categories: ''
    },
    attatchment: 0
  };

  constructor(
    private http: HttpClient,
    private _flashMessagesService: FlashMessagesService
  ) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  getProfileData(partyId: string){
    let desURL = config.RESTUrl + config.profileUrl + config.vendor_profile + partyId;
    return this.http.get(desURL, { headers: this.httpHeader });
  }
  getAddressData(partyId: string){
    let desURL = config.RESTUrl + config.profileUrl + config.address_profile + partyId;
    return this.http.get(desURL, { headers: this.httpHeader });
  }
  getPhoneData(partyId: string) {
    let desURL = config.RESTUrl + config.profileUrl + config.phone_profile + partyId;
    return this.http.get(desURL, { headers: this.httpHeader });
  }
  getEmailData(partyId: string) {
    let desURL = config.RESTUrl + config.profileUrl + config.email_profile + partyId;
    return this.http.get(desURL, { headers: this.httpHeader });
  }

  postProfileData(partyId: string) {
    let desURL = config.RESTUrl + config.profileUrl + config.vendor_profile + partyId;
    let vendorData = {
      firstName: this.vendorProfile.firstName,
      lastName: this.vendorProfile.lastName,
      companyData:{...this.vendorProfile.company},
      attatchment: this.vendorProfile.attatchment
    };
    return this.http.post(desURL, {vendorData:vendorData}, { headers: this.httpHeader });
  }
  postAddressData(partyId: string, addressInfo: any) {
    let desURL = config.RESTUrl + config.profileUrl + config.address_profile + partyId;
    return this.http.post(desURL, {addressInfo: addressInfo}, { headers: this.httpHeader });
  }
  postPhoneData(partyId: string, phoneInfo: any) {
    let desURL = config.RESTUrl + config.profileUrl + config.phone_profile + partyId;
    return this.http.post(desURL, {phoneInfo: phoneInfo}, { headers: this.httpHeader });
  }
  postEmailData(partyId: string, emailInfo: any) {
    let desURL = config.RESTUrl + config.profileUrl + config.email_profile + partyId;
    return this.http.post(desURL, {emailInfo: emailInfo}, { headers: this.httpHeader });
  }

  updateAddressData(addressInfo: any) {
    let desURL = config.RESTUrl + config.profileUrl + config.address_profile;
    return this.http.post(desURL, { addressInfo: addressInfo }, { headers: this.httpHeader });
  }
  deleteAddressData(addressId: string) {
    let desURL = config.RESTUrl + config.profileUrl + config.address_profile + addressId;
    return this.http.delete(desURL, { headers: this.httpHeader });
  }
  deletePhoneData(id: string) {
    let desURL = config.RESTUrl + config.profileUrl + config.phone_profile + id;
    return this.http.delete(desURL, { headers: this.httpHeader });
  }
  deleteEmailData(id: string) {
    let desURL = config.RESTUrl + config.profileUrl + config.email_profile + id;
    return this.http.delete(desURL, { headers: this.httpHeader });
  }

  upload(formData: any) {
    let desURL = config.RESTUrl + config.profileUrl + config.vendorUploadUrl;
    return this.http.post(desURL, formData);
  }


  updateData(partyId: string){
    this.postProfileData(partyId).subscribe((response) => {
      if (response['messageCode'] == 400)
        this._flashMessagesService.show('Update Failed.', { cssClass: 'alert-danger text-center mt-2 ml-2 mr-2', timeout: 2000 });
      if (response['messageCode'] == 200)
        this._flashMessagesService.show('Update Successed', { cssClass: 'alert-success text-center mt-2 ml-2 mr-2', timeout: 2000 });
    });
  }

}
