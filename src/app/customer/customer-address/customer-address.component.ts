import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { CustomerProfileService } from "../../service/customer-profile.service";

import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.css']
})
export class CustomerAddressComponent implements OnInit {

  addressSelected: string = '-1';
  addressInfo: {
    addressId: string,
    Address1: string,
    Address2: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    type: string
  } = {
      addressId: '',
      Address1: '',
      Address2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      type: ''
  };
  addressInfos: any[] = [];

  constructor(
    private _customerProfile: CustomerProfileService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    let partyId = localStorage.getItem('partyId');
    this._customerProfile.getAddressData(partyId).subscribe(response => {
      this.addressInfos = response as Array<any>;
    });

  }

  handleAddressAdd() {
    let partyId = localStorage.getItem('partyId');
    this._customerProfile.postAddressData(partyId, this.addressInfo).subscribe((response) => {
      this.addressInfo.addressId = response['addressId'];
      this.addressInfos.push(this.addressInfo);
      this.addressInfo = {
        addressId: '',
        Address1: '',
        Address2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        type: ''
      };
    });
  }

  handleAddressDelete(addressId: string) {
    if (confirm("Are you sure to delete this address?")) {
      this._customerProfile.deleteAddressData(addressId).subscribe(response => {
        for (let i = 0; i < this.addressInfos.length; i++) {
          if (this.addressInfos[i].addressId === addressId) {
            this.addressInfos.splice(i, 1);
            break;
          }
        }
      });
    }
  }
  handleAddressEdit(address) {
    this.addressInfo = {
      addressId: address.addressId,
      Address1: address.Address1,
      Address2: address.Address2,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      type: address.type
    }
    this.addressSelected = address.addressId;
  }
  handleAddressUpdate() {
    if (confirm('Sure to update the address with this info?')) {
      this._customerProfile.updateAddressData(this.addressInfo).subscribe(response => {
        for (let i = 0; i < this.addressInfos.length; i++) {
          if (this.addressInfos[i].addressId == this.addressInfo.addressId)
            this.addressInfos[i] = { ...this.addressInfo };
        }
        this.addressSelected = '-1';
      });
    }
  }

  backToLanding(){
    this.router.navigate(['customers/customer-landing']);
  }
  
}
