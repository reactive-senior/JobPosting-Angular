import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from "../config";

@Injectable()
export class CategoriesService {

  httpHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }
  
  get_categories(search_string: string) {
    let desURL = config.RESTUrl + config.aws_elasticsearch + config.get_categories;
    let search_query = {
      "search_string": search_string
    }
    return this.http.post(desURL, search_query, { headers: this.httpHeader });
  }

  update_categories(updateData: {categories: Array<string>, keywords: string}){
    let desURL = config.RESTUrl + config.aws_elasticsearch + config.update_categories;
    return this.http.post(desURL, updateData, { headers: this.httpHeader });
  }

}