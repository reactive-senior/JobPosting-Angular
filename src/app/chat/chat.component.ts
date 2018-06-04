import { Component, OnInit } from '@angular/core';

import { BuyersComponent } from '../buyers/buyers.component';
import { VendorsComponent } from "../vendors/vendors.component";

import { User } from "../user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userType: string = '001';
  constructor() { }

  ngOnInit() {
    this.userType = localStorage.getItem('type');
  }

}
