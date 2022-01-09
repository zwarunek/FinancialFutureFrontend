import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppComponent} from "@app/app.component";
import {Company} from "@features/compensation/company-search/company-search.component";

const httpOptions = {
  headers: new HttpHeaders({
    Accept: '*/*',
  }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class CompensationService {

  constructor(private http: HttpClient) { }

  getAllCompanies(): any {
    // @ts-ignore
    return this.http.get(`http://localhost:4200/api/companies`, httpOptions)
  }

  searchCompany(searchText: String) {
    // @ts-ignore
    return this.http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + searchText, httpOptions)
  }
}