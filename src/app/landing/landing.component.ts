import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  search_string = '';

  constructor(private router: Router) {}

  ngOnInit() {

  }

  onSubmit({value, valid}){
    if(valid)
      this.router.navigate(['categories'], {queryParams: value});
  }

}
