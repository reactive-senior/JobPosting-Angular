import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// dummy data
import { User } from "../user";

// service real data
import { UserService } from "../service/user.service";

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  @Input() userType: string;
  @Output() userChange = new EventEmitter();

  user_filter: string;

  data: any[] = [];

  selected: number = -1;

  constructor(private _user: UserService) {
  }

  handleClick(user: any){
    this.selected = user.partyId;
    this.userChange.emit(user);
  }

  getAllVendors(){
    this._user.getAllVendors().subscribe(user => {
      this.data.push(...user);
    });
  }

  getAllBuyers(){
    this._user.getAllBuyers().subscribe(user => {
      this.data.push(...user);
    });
  }

  ngOnInit() {
    if (this.userType === "buyers"){
      this.getAllVendors();
    }
    else if(this.userType === "vendors")
      this.getAllBuyers();
  }

}
