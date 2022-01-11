import { Component, OnInit } from '@angular/core';
import {InputNumber} from "primeng/inputnumber";

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
  employerMatch: number = 0;
  employerMatchEnd: number = 0;


  constructor() {
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

  }
}
