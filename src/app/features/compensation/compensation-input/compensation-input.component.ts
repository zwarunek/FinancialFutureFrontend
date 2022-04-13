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

@Component({
  selector: 'app-compensation-input',
  templateUrl: './compensation-input.component.html',
  styleUrls: ['./compensation-input.component.scss']
})
export class CompensationInputComponent implements OnInit {
  title: string = '';
  baseSalary!: number;
  yearBonuses: any[] = [];
  hasStockCompensation: boolean = false;
  employerMatch!: number;
  employerMatchEnd!: number;
  @Input() existingLevels: any[] = []
  @Input() selectedCompany?: Company;
  @Output() selectedCompanyChange = new EventEmitter<Company>();
  @Output() saveLevelEvent = new EventEmitter<any>();
  @ViewChild(CompanySearchComponent) companySearch: any;
  @ViewChild(StockCompSelectorComponent) stockCompSelector: any;

  constructor(public compensationService:CompensationService) {
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
        this.yearBonuses.push({dollarBonus: bonus.value, year: this.yearBonuses.length + 1})
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

  saveLevel() {
    let tcDetails = {
      "salary": this.baseSalary?this.baseSalary:0,
      "company": this.selectedCompany?.name?this.selectedCompany.name:"",
      "vestingSchedule": this.stockCompSelector.getVestingSchedule(),
      "bonuses": this.yearBonuses,
      "_401kMatch":this.employerMatch?this.employerMatch:0,
      "_401kMatchEnds": this.employerMatchEnd?this.employerMatchEnd:0,
      "title":this.title
    }

    let id = -1;
    if(this.existingLevels.length > 0) {
      this.existingLevels.forEach(level => {
        if(level.title == this.title)
          id = level.id;
      })
    }

    if(id != -1) {
      this.compensationService.updateLevel(id, tcDetails).subscribe((res: any) => {
        this.saveLevelEvent.emit(res)
      })
    }
    else {
      this.compensationService.saveLevel(tcDetails).subscribe(() => {
        this.saveLevelEvent.emit()
      });
    }

  }
  selectCompany(company: Company | undefined){
    this.selectedCompany = company
    this.selectedCompanyChange.emit(company)
  }
  editLevel(level: any) {
    this.title = level.title
    this.baseSalary = level.salary
    if(level.bonuses)
      this.yearBonuses = level.bonuses
    this.employerMatch = level._401kMatch
    this.employerMatchEnd = level._401kMatchEnds
    if(level.vestingSchedule)
      this.stockCompSelector.setVestingSchedule(level.vestingSchedule)
  }

  clear() {
    this.title = ''
    this.baseSalary = 0
    this.yearBonuses = []
    this.employerMatch = 0
    this.employerMatchEnd = 0
    this.selectCompany(undefined);
    this.stockCompSelector.clear()
  }
}
