import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compensation-input',
  templateUrl: './compensation-input.component.html',
  styleUrls: ['./compensation-input.component.scss']
})
export class CompensationInputComponent implements OnInit {

  levelName: string = '';
  baseSalary!: number;
  yearBonuses: any[] = [];
  enteredBonus: any = null;
  hasStockCompensation: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  addYearBonus($event: any) {
    console.log(this.baseSalary)
    if($event.key === 'Enter' || $event.key === ',') {
      this.yearBonuses.push({year: this.yearBonuses.length + 1, bonus: this.enteredBonus})
      // @ts-ignore
      this.baseSalary = undefined
    }

  }
}
