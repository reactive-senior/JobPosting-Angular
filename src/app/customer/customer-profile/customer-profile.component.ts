import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { CustomerProfileService } from "../../service/customer-profile.service";

import { Router } from '@angular/router';

declare var $;


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  addressSelected: string = '-1';

  firstName: string = '';
  lastName: string = '';

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
  phoneInfo: {
    id: string,
    countryCode: string,
    phoneNo: string,
    type: string,
    preference?: string
  } = {
      id: '',
      countryCode: '',
      phoneNo: '',
      type: '',
      preference: ''
    };
  emailInfo: {
    id: string,
    emailId: string,
    type: string,
    preference?: string
  } = {
      id: '',
      emailId: '',
      type: '',
      preference: ''
    };

  addressInfos: any[] = [];
  phoneInfos: any[] = [];
  emailInfos: any[] = [];

  isWithCategories: string = '';

  constructor(
    private _customerProfile: CustomerProfileService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isWithCategories = localStorage.getItem('isWithCategories');

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    let partyId = localStorage.getItem('partyId');
    this._customerProfile.getProfileData(partyId).subscribe(response => {
      if (response) {
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
      }
    });
    this._customerProfile.getAddressData(partyId).subscribe(response => {
      this.addressInfos = response as Array<any>;
    });
    this._customerProfile.getPhoneData(partyId).subscribe(response => {
      this.phoneInfos = response as Array<any>;
    });
    this._customerProfile.getEmailData(partyId).subscribe(response => {
      this.emailInfos = response as Array<any>;
    });
  }

  backToLanding(){
    this.router.navigate(['customers/customer-landing']);
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

  handlePhoneAdd() {
    let partyId = localStorage.getItem('partyId');
    this._customerProfile.postPhoneData(partyId, this.phoneInfo).subscribe((response) => {
      this.phoneInfo.id = response['id'];
      this.phoneInfos.push(this.phoneInfo);
      this.phoneInfo = {
        id: '',
        countryCode: '',
        phoneNo: '',
        type: '',
        preference: ''
      }
    });
  }

  handleEmailAdd() {
    let partyId = localStorage.getItem('partyId');
    this._customerProfile.postEmailData(partyId, this.emailInfo).subscribe((response) => {
      this.emailInfo.id = response['id'];
      this.emailInfos.push(this.emailInfo);
      this.emailInfo = {
        id: '',
        emailId: '',
        type: '',
        preference: ''
      }
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

  handlePhoneDelete(id: string) {
    if (confirm("Are you sure to delete this phone number?")) {
      this._customerProfile.deletePhoneData(id).subscribe(response => {
        for (let i = 0; i < this.phoneInfos.length; i++) {
          if (this.phoneInfos[i].id === id) {
            this.phoneInfos.splice(i, 1);
            break;
          }
        }
      });
    }
  }

  handleEmailDelete(id: string) {
    if (confirm("Are you sure to delete this email?")) {
      this._customerProfile.deleteEmailData(id).subscribe(response => {
        for (let i = 0; i < this.emailInfos.length; i++) {
          if (this.emailInfos[i].id === id) {
            this.emailInfos.splice(i, 1);
            break;
          }
        }
      });
    }
  }

  updateProfile() {
    this._customerProfile.customerProfile.firstName = this.firstName;
    this._customerProfile.customerProfile.lastName = this.lastName;
    this._customerProfile.customerProfile.address = this.addressInfos;
    this._customerProfile.customerProfile.phone = this.phoneInfos;
    this._customerProfile.customerProfile.email = this.emailInfos;
    this._customerProfile.updateData(localStorage.getItem('partyId'));
  }

}
