import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerLogoutService } from "../../service/customer-logout.service";

import { JobRequestService } from "../../service/job-request.service";
import { CustomerProfileService } from "../../service/customer-profile.service";

import { FlashMessagesService } from 'angular2-flash-messages';
import { NumberSymbol } from '@angular/common';


@Component({
  selector: 'app-customer-landing',
  templateUrl: './customer-landing.component.html',
  styleUrls: ['./customer-landing.component.css', '../../../assets/style.bundle.css']
})
export class CustomerLandingComponent implements OnInit {

  isLoading: boolean = true;

  servicerequestkey: string = '';
  service_info: any = {};
  username: string = '';
  categories: Array<string> = [];

  addressInfos: any[] = [];

  description: string = '';
  selectedAddress: string = '0';
  selectedAddressInfo: {
    addressId: number,
    Address1: string,
    Address2: string,
    city: string,
    country: string,
    postalCode: string,
    state: string,
    type: string
  } = {
    addressId: 0,
    Address1: '',
    Address2: '',
    city: '',
    country: '',
    postalCode: '',
    state: '',
    type: ''
  };
  filesToUpload: Array<File> = [];

  attatchmentId: number = 0;
  

  constructor(
    private router: Router,
    private _customerLogoutService: CustomerLogoutService,
    private _jobRequestService: JobRequestService,
    private _customerProfile: CustomerProfileService,
    private _flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.servicerequestkey = localStorage.getItem('servicerequestkey');
    this.username = localStorage.getItem('username');
    this._jobRequestService.getJobRequest({servicerequestkey: this.servicerequestkey}).subscribe(response => {
      if(response['service_info']){
        this.service_info = response['service_info'];
        this.categories = this.service_info.category.split("|");
        this.categories.every((currentCategory, index)=>{this.categories[index] = currentCategory.trim(); return true;})
      }
      this._customerProfile.getAddressData(localStorage.getItem('partyId')).subscribe(response => {
        this.addressInfos = response as Array<any>;
        this.isLoading = false;
      });
      
    });
  }

  handleAddressChange(currentAddressId){
    if(currentAddressId == 0){
      this.selectedAddressInfo = {
        addressId: 0,
        Address1: '',
        Address2: '',
        city: '',
        country: '',
        postalCode: '',
        state: '',
        type: ''
      };
      return;
    }
    this.addressInfos.every((currentAddress, index) => {if(currentAddress.addressId == currentAddressId) {this.selectedAddressInfo = {...currentAddress}; return false;} return true;})
  }

  handleFileInput(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  addAddress(){
    this.router.navigate(['./customers/customer-address']);
  }

  updateServiceInfo(){
    const formData: any = new FormData();
    let attId = 0;
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++)
      formData.append("uploads[]", files[i], files[i]['name']);
    if(files.length > 0){
      this._jobRequestService.upload(formData).subscribe(response => {
        this.attatchmentId = response['attId'];
        let update_info = {
          requestdescription: this.description,
          attatchment: this.attatchmentId,
          addressId: this.selectedAddress
        }
        this._jobRequestService.updateData({servicerequestkey: localStorage.getItem('servicerequestkey'), update_info: update_info}).subscribe(response=>{
          this.isLoading = false;
          this._flashMessagesService.show('Successfully Updated.', { cssClass: 'alert-success text-center mt-2 ml-2 mr-2', timeout: 2000 });
          this.router.navigate(['customers/customer-request-list']);
        });
      });
    } else {
      let update_info = {
        requestdescription: this.description,
        attatchment: 0,
        addressId: this.selectedAddress
      }
      this._jobRequestService.updateData({servicerequestkey: localStorage.getItem('servicerequestkey'), update_info: update_info}).subscribe(response=>{
        this.isLoading = false;
        this._flashMessagesService.show('Successfully Updated.', { cssClass: 'alert-success text-center mt-2 ml-2 mr-2', timeout: 2000 });
        this.router.navigate(['customers/customer-request-list']);
      });
    }
    
    this.isLoading = true;
  }

  doLogOut() {
    localStorage.clear();
    this._customerLogoutService.logout();
    this.router.navigate(['/']);
  }
  

}
