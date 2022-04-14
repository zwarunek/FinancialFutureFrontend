import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CompensationService} from "@features/compensation/compensation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cols: any[] = [];
  years: any[] = [];
  filteredStates: any[] = [];
  states: any[] = [];
  startingAge: number = 20;
  companies: any[] = [];

  constructor(private compensationService: CompensationService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'age', header: 'Age' },
      { field: 'state', header: 'State' },
      { field: 'company', header: 'Company' },
      { field: 'level', header: 'Level' },
      { field: 'baseSalary', header: 'Base Salary' },
      { field: 'stockComp', header: 'Stock Comp' },
      { field: 'bonus', header: 'Bonus' },
      { field: 'totalComp', header: 'Total Comp' }
    ];

    this.states = [
      { name: 'Alabama', abbreviation: 'AL' },
      { name: 'Alaska', abbreviation: 'AK' },
      { name: 'Arizona', abbreviation: 'AZ' },
      { name: 'Arkansas', abbreviation: 'AR' },
      { name: 'California', abbreviation: 'CA' },
      { name: 'Colorado', abbreviation: 'CO' },
      { name: 'Connecticut', abbreviation: 'CT' },
      { name: 'Delaware', abbreviation: 'DE' },
      { name: 'Florida', abbreviation: 'FL' },
      { name: 'Georgia', abbreviation: 'GA' },
      { name: 'Guam', abbreviation: 'GU' },
      { name: 'Hawaii', abbreviation: 'HI' },
      { name: 'Idaho', abbreviation: 'ID' },
      { name: 'Illinois', abbreviation: 'IL' },
      { name: 'Indiana', abbreviation: 'IN' },
      { name: 'Iowa', abbreviation: 'IA' },
      { name: 'Kansas', abbreviation: 'KS' },
      { name: 'Kentucky', abbreviation: 'KY' },
      { name: 'Louisiana', abbreviation: 'LA' },
      { name: 'Maine', abbreviation: 'ME' },
      { name: 'Maryland', abbreviation: 'MD' },
      { name: 'Massachusetts', abbreviation: 'MA' },
      { name: 'Michigan', abbreviation: 'MI' },
      { name: 'Minnesota', abbreviation: 'MN' },
      { name: 'Mississippi', abbreviation: 'MS' },
      { name: 'Missouri', abbreviation: 'MO' },
      { name: 'Montana', abbreviation: 'MT' },
      { name: 'Nebraska', abbreviation: 'NE' },
      { name: 'Nevada', abbreviation: 'NV' },
      { name: 'New Hampshire', abbreviation: 'NH' },
      { name: 'New Jersey', abbreviation: 'NJ' },
      { name: 'New Mexico', abbreviation: 'NM' },
      { name: 'New York', abbreviation: 'NY' },
      { name: 'North Carolina', abbreviation: 'NC' },
      { name: 'North Dakota', abbreviation: 'ND' },
      { name: 'Ohio', abbreviation: 'OH' },
      { name: 'Oklahoma', abbreviation: 'OK' },
      { name: 'Oregon', abbreviation: 'OR' },
      { name: 'Pennsylvania', abbreviation: 'PA' },
      { name: 'Rhode Island', abbreviation: 'RI' },
      { name: 'South Carolina', abbreviation: 'SC' },
      { name: 'South Dakota', abbreviation: 'SD' },
      { name: 'Tennessee', abbreviation: 'TN' },
      { name: 'Texas', abbreviation: 'TX' },
      { name: 'Utah', abbreviation: 'UT' },
      { name: 'Vermont', abbreviation: 'VT' },
      { name: 'Virginia', abbreviation: 'VA' },
      { name: 'Washington', abbreviation: 'WA' },
      { name: 'West Virginia', abbreviation: 'WV' },
      { name: 'Wisconsin', abbreviation: 'WI' },
      { name: 'Wyoming', abbreviation: 'WY' }
    ];
  }
  filterState(event: { query: any; }) {

    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.states.length; i++) {
      let state = this.states[i];
      if (state.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(state);
      }
    }

    this.filteredStates = filtered;
  }

  addYear() {
    this.years.push({
      age:  this.startingAge + this.years.length,
      state: '',
      company: '',
      companies: [],
      level: '',
      baseSalary: 0,
      stockComp: 0,
      bonus: 0,
      totalComp: 0
    })
    console.log(this.years);
    this.cdr.detectChanges();
  }

  removeYear() {
    this.years.pop();
    this.cdr.detectChanges();
  }
  inputChanged(index: number){
    if(this.years[index].company !== '') {
      this.compensationService.searchCompany(this.years[index].company).subscribe((value: any) => {
        this.years[index].companies = value.body;
      });
    }
    else this.years[index].companies = []
  }

  selectCompany(company: any, index: number) {
    this.years[index].company = company;
    this.years[index].companies = []

    this.compensationService.getExistingLevels(company.name).subscribe((value: any) => {
      this.years[index].levels = value.body;
      console.log(this.years[index].levels);
    });
    this.years[index].level = undefined;
    this.cdr.detectChanges();
  }

  removeCompany(index: number) {
    this.years[index].company = '';
    this.cdr.detectChanges();
  }

  test(event: Event, index: number) {
    console.log(event, this.years);
  }
}
