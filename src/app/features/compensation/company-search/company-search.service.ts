import { Injectable } from '@angular/core';

@Injectable()
export class CompanySearchService {

  filterData: any[];
  constructor() {
    this.filterData = []
  }

  get data(): any{
    return this.filterData;
  }

  set data(val: any){
    this.filterData = val;
    console.log(this.filterData);
  }
}
