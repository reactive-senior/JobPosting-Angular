import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../service/categories.service';

import { FlashMessagesService } from 'angular2-flash-messages';
import { IMyDpOptions } from '../../../node_modules/angular4-datepicker/src/my-date-picker';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../../assets/style.bundle.css']
})
export class CategoriesComponent implements OnInit {

  sub: any;
  cs_queryString: string = '';
  isLoading: boolean = true;
  categories: Array<string> = [];

  category: string = '';
  zipcode: string = '';

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  public dateModel: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private _categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.cs_queryString = params['searchString'];
        localStorage.setItem('searchString', this.cs_queryString);
        this._categoriesService.get_categories(this.cs_queryString).subscribe(response => {
          this.isLoading = false;
          this.categories = response['categories'];
        });
        this.isLoading = true;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  removeCategory(index: number){
    this.categories.splice(index, 1);
  }

  onAddCategory(){
    if(this.category)
    {
      this.categories.push(this.category);
      this.category = '';
    }
  }

  bookService(){
    if(this.categories && this.dateModel.formatted && this.zipcode){
      localStorage.setItem('isWithCategories', 'true');
      localStorage.setItem('categories', JSON.stringify(this.categories));
      localStorage.setItem('startDate', this.dateModel.formatted);
      localStorage.setItem('zipcode', this.zipcode);
      this.isLoading = true;
      this._categoriesService.update_categories({categories: this.categories, keywords: this.cs_queryString}).subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['auth/customer']);
      });

      this.router.navigate(['auth/customer']); //should be changed later on

    } else {
      this._flashMessagesService.show('Please fill in all fields.', { cssClass: 'alert-danger text-center mt-2 ml-2 mr-2 inline-flashmessage', timeout: 2000 });
    }
  }  

}
