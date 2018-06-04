import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { VendorProfileService } from "../../service/vendor-profile.service";
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

declare var $;


@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {

  addressSelected: string = '-1';

  firstName: string = '';
  lastName: string = '';
  companyName: string = '';
  preferredName: string = '';
  regNumber: string = '';
  vatRegNumber: string = '';
  insurance: string = '';
  qualifications: string = '';
  categories: string = '';

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

  filesToUpload: Array<File> = [];

  attatchments: any[] = [];

  constructor(
    private _vendorProfile: VendorProfileService,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    let partyId = localStorage.getItem('partyId');
    this._vendorProfile.getProfileData(partyId).subscribe(response => {
      if(response){
        this.firstName = response['firstName'];
        this.lastName = response['lastName'];
        this.companyName = response['companyName'];
        this.preferredName = response['preferredName'];
        this.regNumber = response['regNo'];
        this.vatRegNumber = response['vatRegNo'];
        this.insurance = response['insurance'];
        this.qualifications = response['qualifications'];
        this.categories = response['categories'];
        this.attatchments = response['attatchment'];
      }
    });
    this._vendorProfile.getAddressData(partyId).subscribe(response => {
      this.addressInfos = response as Array<any>;
    });
    this._vendorProfile.getPhoneData(partyId).subscribe(response => {
      this.phoneInfos = response as Array<any>;
    });
    this._vendorProfile.getEmailData(partyId).subscribe(response => {
      this.emailInfos = response as Array<any>;
    });
  }

  handleAddressAdd() {
    let partyId = localStorage.getItem('partyId');
    this._vendorProfile.postAddressData(partyId, this.addressInfo).subscribe((response) => {
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
    this._vendorProfile.postPhoneData(partyId, this.phoneInfo).subscribe((response)=>{
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
    this._vendorProfile.postEmailData(partyId, this.emailInfo).subscribe((response)=>{
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

  handleAddressDelete(addressId: string){
    if (confirm("Are you sure to delete this address?")) {
      this._vendorProfile.deleteAddressData(addressId).subscribe(response => {
        for(let i = 0; i < this.addressInfos.length; i++){
          if (this.addressInfos[i].addressId === addressId) {
            this.addressInfos.splice(i, 1);
            break;
          }
        }
      });
    }
  }

  handleAddressEdit(address){
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

  handleAddressUpdate(){
    if(confirm('Sure to update the address with this info?'))
    {
      this._vendorProfile.updateAddressData(this.addressInfo).subscribe(response => {
        for(let i = 0; i < this.addressInfos.length; i++) {
          if(this.addressInfos[i].addressId == this.addressInfo.addressId)
            this.addressInfos[i] = {...this.addressInfo};
        }
        this.addressSelected = '-1';
      });
    }
  }

  handlePhoneDelete(id: string){
    if (confirm("Are you sure to delete this phone number?")) {
      this._vendorProfile.deletePhoneData(id).subscribe(response => {
        for (let i = 0; i < this.phoneInfos.length; i++) {
          if (this.phoneInfos[i].id === id) {
            this.phoneInfos.splice(i, 1);
            break;
          }
        }
      });
    }
  }

  handleEmailDelete(id: string){
    if (confirm("Are you sure to delete this email?")) {
      this._vendorProfile.deleteEmailData(id).subscribe(response => {
        for (let i = 0; i < this.emailInfos.length; i++) {
          if (this.emailInfos[i].id === id) {
            this.emailInfos.splice(i, 1);
            break;
          }
        }
      });
    }
  }

  clearData() {
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
    this.phoneInfo = {
      id: '',
      countryCode: '',
      phoneNo: '',
      type: '',
      preference: ''
    }
    this.emailInfo = {
      id: '',
      emailId: '',
      type: '',
      preference: ''
    }
    this.addressInfos = [];
    this.phoneInfos = [];
    this.emailInfos = [];
    this.filesToUpload = [];
  }

  handleFileInput(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  upload(){
    const formData: any = new FormData();
    let attId = 0;
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++)
      formData.append("uploads[]", files[i], files[i]['name']);
    this._vendorProfile.upload(formData).subscribe(response => {
      this._vendorProfile.vendorProfile.attatchment = response['attId'];
      this.attatchments = response['attatchments'];
      this._vendorProfile.updateData(localStorage.getItem('partyId'));
    });
  }

  updateProfile() {
    this._vendorProfile.vendorProfile.firstName = this.firstName;
    this._vendorProfile.vendorProfile.lastName = this.lastName;
    this._vendorProfile.vendorProfile.company.companyName = this.companyName;
    this._vendorProfile.vendorProfile.company.preferredName = this.preferredName;
    this._vendorProfile.vendorProfile.company.regNumber = this.regNumber;
    this._vendorProfile.vendorProfile.company.vatRegNumber = this.vatRegNumber;
    this._vendorProfile.vendorProfile.company.insurance = this.insurance;
    this._vendorProfile.vendorProfile.company.qualifications = this.qualifications;
    this._vendorProfile.vendorProfile.company.categories = this.categories;
    this._vendorProfile.vendorProfile.address = this.addressInfos;
    this._vendorProfile.vendorProfile.phone = this.phoneInfos;
    this._vendorProfile.vendorProfile.email = this.emailInfos;
    this._vendorProfile.vendorProfile.attatchment = 0;
    if(this.filesToUpload.length == 0)
      this._vendorProfile.updateData(localStorage.getItem('partyId'));
    else {
      this.upload();
    }
  }

}
