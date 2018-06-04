import { Component, OnInit } from '@angular/core';

import { UserslistComponent } from "../userslist/userslist.component";
import { MessagesComponent } from "../messages/messages.component";

import { User } from "../user";

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  user: any;

  constructor() { }
  
  handleUserChange(user: any) {
    this.user = user;
  }

  ngOnInit() {
  }

}
