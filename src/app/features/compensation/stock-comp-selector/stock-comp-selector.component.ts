import {Component, OnInit} from '@angular/core';

export interface Year {
  percent: number,
  range: number[],
}

@Component({
  selector: 'app-stock-comp-selector',
  templateUrl: './stock-comp-selector.component.html',
  styleUrls: ['./stock-comp-selector.component.scss']
})
export class StockCompSelectorComponent implements OnInit {

  years: Year[];

  constructor() {
    this.years = [{
      percent: 25,
      range: [0,25]
    }, {
      percent: 25,
      range: [25,50]
    }, {
      percent: 25,
      range: [50,75]
    }, {
      percent: 25,
      range: [75,100]
    }];
  }

  ngOnInit(): void {
  }
  rebalance(i: number, changedRange: number[], elm: any){
    let handle = elm.handleIndex;
    if(i === 0 && handle === 0){
      this.years[i].range[0] = 0
      return
    }
    if(i === this.years.length-1 && handle === 1){
      this.years[i].range[1] = 100
      return
    }
    this.years[i].percent = this.years[i].range[1] - this.years[i].range[0]
    if(handle === 0){
      this.years[i-1].percent = this.years[i].range[0] - this.years[i-1].range[0]
      this.years[i-1].range = [this.years[i-1].range[0], this.years[i].range[0]]
      if(this.years[i-1].percent <= 0 || this.years[i].range[0] <= this.years[i-1].range[0]){
        console.log(this.years[i].range, this.years[i-1].range)
        let total = 0
        for (let j = 0; j < this.years.length; j++) {
          if (j < i-1)
            total += this.years[j].range[1] - this.years[j].range[0]
        }
        this.years[i].range[0] = total
        this.years[i].percent = this.years[i].range[1] - this.years[i].range[0]
        this.years[i-1].percent = 0
        this.years[i-1].range = [this.years[i].range[0], this.years[i].range[0]]
        return;
        // console.log('here')
      }
    }
    else{
      this.years[i+1].percent = this.years[i+1].range[1] - this.years[i].range[1]
      this.years[i+1].range = [this.years[i].range[1], this.years[i+1].range[1]]
      if(this.years[i+1].percent <=0 || this.years[i].range[1] >= this.years[i+1].range[1]){
        console.log(this.years[i].range, this.years[i+1].range)
        let total = 0
        for (let j = 0; j < this.years.length; j++) {
          if (j !== i && j !== i+1)
            total += this.years[j].percent
        }
        console.log(total)
        this.years[i].range[1] = this.years[i].range[0] + (100-total)
        this.years[i].percent = 100 - total
        this.years[i+1].percent = 0
        this.years[i+1].range = [this.years[i].range[1], this.years[i].range[1]]
        return;
      }
    }
  }
  addYear() {
    let total = 0
    for (let i = 0; i < this.years.length; i++){
      this.years[i].percent = Math.round((this.years[i].percent * this.years.length)/(this.years.length+1))
      this.years[i].range = [total, this.years[i].percent + total]
      total += this.years[i].percent
    }
    this.years.push({percent: 100-total, range: [total,100]})
  }

  removeYear() {
    let total = 0
    for (let i = 0; i < this.years.length-1; i++){
      this.years[i].percent = Math.round((this.years[i].percent * this.years.length)/(this.years.length-1))
      this.years[i].range = [total, total + this.years[i].percent]
      total += this.years[i].percent
    }
    this.years.pop();
  }
}
