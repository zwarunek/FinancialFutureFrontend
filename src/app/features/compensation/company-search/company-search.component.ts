import { Component, OnInit } from '@angular/core';
import {CompensationService} from "@features/compensation/compensation.service";
import {AppComponent} from "@app/app.component";

export interface Company{
  name?: string,
  domain?: string,
  logo?: string
}


@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss']
})
export class CompanySearchComponent implements OnInit {

  companies: Company[] = [];
  selectedCompany?: Company;
  virtualCompanies: Company[] = [];
  searchText: String = '';

  constructor(private companyService: CompensationService, private app: AppComponent) {
    this.virtualCompanies = []
  }
  ngOnInit(): void {
  }
  inputChanged(){
    if(this.searchText !== '') {
      this.companyService.searchCompany(this.searchText).subscribe((value: any) => {
        this.companies = value.body;
      });
    }
    else this.companies = []
  }
}
