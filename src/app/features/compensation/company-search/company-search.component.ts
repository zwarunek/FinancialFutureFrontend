import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {CompensationService} from "@features/compensation/compensation.service";
import {AppComponent} from "@app/app.component";
import {CompanySearchService} from "@features/compensation/company-search/company-search.service";
import {
  StockCompSelectorComponent
} from "@features/compensation/compensation-input/stock-comp-selector/stock-comp-selector.component";
import {
  ExistingLevelsComponent
} from "@features/compensation/existing-levels/existing-levels.component";

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

  public companies: Company[] = [];
  public selectedCompany?: Company;
  public virtualCompanies: Company[] = [];
  public searchText: string = '';
  @Output() onSelectCompany = new EventEmitter<string>();

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

  selectCompany(company: Company) {
    this.selectedCompany = company;
    this.searchText = '';
    this.companies = []
    this.onSelectCompany.emit(company.name?.toLowerCase() as string)
  }
}
