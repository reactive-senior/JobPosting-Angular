import { Component, OnInit } from '@angular/core';

import { UserslistComponent } from "../userslist/userslist.component";
import { MessagesComponent } from "../messages/messages.component";

import { User } from "../user";

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  user: User;

  constructor() { }

  handleUserChange(user: User) {
    this.user = user;
  }

  ngOnInit() {
  }

}
