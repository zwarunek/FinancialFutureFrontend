import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {
  Company,
  CompanySearchComponent
} from "@features/compensation/company-search/company-search.component";
import {
  StockCompSelectorComponent
} from "@features/compensation/stock-comp-selector/stock-comp-selector.component";
import {CompanySearchService} from "@features/compensation/company-search/company-search.service";
import {CompensationService} from "@features/compensation/compensation.service";


// const {parse, stringify} = require('flatted/cjs');
@Component({
  selector: 'app-compensation-input',
  templateUrl: './compensation-input.component.html',
  styleUrls: ['./compensation-input.component.scss']
})
export class CompensationInputComponent implements OnInit {
  title: string = '';
  baseSalary!: number;
  yearBonuses: any[] = [];
  enteredBonus: any;
  hasStockCompensation: boolean = false;
  enterHit: boolean = false;
  employerMatch!: number;
  employerMatchEnd!: number;
  existingLevels: any[] = []
  @Input() selectedCompany?: Company;
  @Output() selectedCompanyChange = new EventEmitter<Company>();
  @ViewChildren(CompanySearchComponent) companySearch: any;
  @ViewChildren(StockCompSelectorComponent) stockCompSelector: any;



  constructor(public companyService:CompensationService) {
  }

  ngOnInit(): void {
  }

  addYearBonus(event: any, bonus: any) {
    event.originalEvent.preventDefault()
    bonus.value = event.value
  }

  keyDown(event: any, bonus: any) {
    if(bonus.value != null && (event.key === 'Enter' || event.key === ',')) {
      event.preventDefault()
      if(this.yearBonuses.length <8) {
        this.yearBonuses.push({bonus: bonus.value, year: this.yearBonuses.length + 1})
        bonus.value = undefined
      }
    }
  }

  removeBonus(i: number) {
    delete this.yearBonuses[i]
    this.yearBonuses.slice(0, this.yearBonuses.length-2)
    this.yearBonuses = this.yearBonuses.filter(function (el) {
      return el != null;
    });
    for(let i = 0; i < this.yearBonuses.length; i++)
      this.yearBonuses[i].year = i+1
  }

  addCompensation() {
    console.log(this.stockCompSelector)
    let tcDetails = {
      'salary': this.baseSalary,
      "company": this.companySearch.selectedCompany?.name,
      "vestingSchedule": this.stockCompSelector.getVestingSchedule(),
      "bonuses": this.yearBonuses,
      "_401kMatch":this.employerMatch,
      "_401kMatchEnds": this.employerMatchEnd,
      "title":this.title
    }
    console.log(JSON.stringify(tcDetails, null, 4))
  }
  onSelectCompany(company: Company){
    this.selectedCompany = company
    this.selectedCompanyChange.emit(company)
  }
  resetCompany() {
    this.selectedCompany = undefined
  }

}
