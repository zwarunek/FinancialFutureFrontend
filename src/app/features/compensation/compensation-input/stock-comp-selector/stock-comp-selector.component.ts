import {Component, OnInit} from '@angular/core';

export interface Year {
  range: number[],
}

export interface CompanyVestingSchedule {
  company: string,
  schedule: Year[],
}

@Component({
  selector: 'app-stock-comp-selector',
  templateUrl: './stock-comp-selector.component.html',
  styleUrls: ['./stock-comp-selector.component.scss']
})
export class StockCompSelectorComponent implements OnInit {

  years: Year[];
  vestingScheduleOptions: CompanyVestingSchedule[] = [];
  vestingTimeOptions: any[] = [];
  compiledTimeOptions: any[] = [];
  // @ts-ignore
  vestingScheduleSelected: any;
  compiledTimeSelected: any = 'Yearly';
  stockCompensation!: number;

  constructor() {
    this.years = [{
      range: [0, 25]
    }, {
      range: [25, 50]
    }, {
      range: [50, 75]
    }, {
      range: [75, 100]
    }];
    this.compiledTimeOptions = ['Yearly', 'Bi-Yearly', 'Quarterly', 'Monthly', 'Weekly'];
    this.vestingScheduleOptions = [
      {company: 'Amazon', schedule: [{
          range: [0, 5]
        }, {
          range: [5, 20]
        }, {
          range: [20, 60]
        }, {
          range: [60, 100]
        }]},
      {company: 'Google', schedule: [{
          range: [0, 33]
        }, {
          range: [33, 66]
        }, {
          range: [66, 88]
        }, {
          range: [88, 100]
        }]},
      {company: 'Uber', schedule: [{
          range: [0, 35]
        }, {
          range: [35, 65]
        }, {
          range: [65, 85]
        }, {
          range: [85, 100]
        }]}
    ]
  }

  ngOnInit(): void {
  }

  rebalance(i: number, changedRange: number[], elm: any) {
    let handle = elm.handleIndex;
    if (i === 0 && handle === 0) {
      this.years[i].range[0] = 0
      return
    }
    if (i === this.years.length - 1 && handle === 1) {
      this.years[i].range[1] = 100
      return
    }
    this.vestingScheduleSelected = undefined
    if (handle === 0) {
      this.years[i - 1].range = [this.years[i - 1].range[0], this.years[i].range[0]]
      if (this.years[i].range[0] - this.years[i - 1].range[0] <= 0 || this.years[i].range[0] <= this.years[i - 1].range[0]) {
        let total = 0
        for (let j = 0; j < this.years.length; j++) {
          if (j < i - 1)
            total += this.years[j].range[1] - this.years[j].range[0]
        }
        this.years[i].range[0] = total
        this.years[i - 1].range = [this.years[i].range[0], this.years[i].range[0]]
        return;
      }
    } else {
      this.years[i + 1].range = [this.years[i].range[1], this.years[i + 1].range[1]]
      if (this.years[i + 1].range[1] - this.years[i].range[1] <= 0 || this.years[i].range[1] >= this.years[i + 1].range[1]) {
        let total = 0
        for (let j = 0; j < this.years.length; j++) {
          if (j !== i && j !== i + 1)
            total += this.years[j].range[1] - this.years[j].range[0]
        }
        this.years[i].range[1] = this.years[i].range[0] + (100 - total)
        this.years[i + 1].range = [this.years[i].range[1], this.years[i].range[1]]
        return;
      }
    }
  }

  addYear() {
    this.vestingScheduleSelected = undefined
    if (this.years.length < 8) {
      this.years.push({range: [0, 0]})
      this.balance()
    }
  }

  removeYear() {
    this.vestingScheduleSelected = undefined
    if (this.years.length > 1) {
      this.years.pop()
      this.balance()
    }
  }

  balance() {
    let total = 0
    for (let i = 0; i < this.years.length; i++) {
      this.years[i].range = [total, total + Math.floor(100 / this.years.length)]
      total += this.years[i].range[1] - this.years[i].range[0]
    }
    this.years[0].range[0] = 0
    this.years[this.years.length - 1].range[1] = 100
  }

  vestingScheduleChanged() {
    if(this.vestingScheduleSelected) {
      this.years = JSON.parse(JSON.stringify(this.vestingScheduleSelected))
    }
    else
      this.years = [{
        range: [0, 25]
      }, {
        range: [25, 50]
      }, {
        range: [50, 75]
      }, {
        range: [75, 100]
      }];

  }

  compiledTimeChanged() {

  }

  clear($event: any) {
    console.log($event, this.vestingScheduleSelected, this.vestingScheduleOptions)
  }
  public clone(obj: any): any {
    let clonedObj: any = {}
    for (let attribute in obj) {
      if (typeof obj[attribute] === "object") {
        clonedObj[attribute] = obj[attribute].clone();
      } else {
        clonedObj[attribute] = obj[attribute];
      }
    }
    return clonedObj
  }
}
