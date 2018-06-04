import { Component, OnInit } from '@angular/core';
import { JobRequestService } from "../../service/job-request.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-service-info',
  templateUrl: './customer-service-info.component.html',
  styleUrls: ['./customer-service-info.component.css', '../../../assets/style.bundle.css']
})
export class CustomerServiceInfoComponent implements OnInit {

  customerId: string = '';
  serviceRequests: any = [];

  isLoading: boolean = true;

  constructor(
    private router: Router,
    private _jobRequestService: JobRequestService,
  ) { }

  ngOnInit() {
    this.customerId = localStorage.getItem('partyId');
    this._jobRequestService.getJobByCustomer({customerId: this.customerId}).subscribe(response => {
      this.serviceRequests = response['serviceRequest'];
      this.isLoading = false;
      console.log(this.serviceRequests);
    });
    this.isLoading = true;
  }

  doLogOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
