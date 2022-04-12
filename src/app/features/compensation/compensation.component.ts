import { Component, OnInit } from '@angular/core';
import {Company} from "@features/compensation/company-search/company-search.component";

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.scss']
})
export class CompensationComponent implements OnInit {

  selectedCompany?: Company

  constructor() { }

  ngOnInit(): void {
  }

  updateSelectedCompany($event: Company | undefined) {
    this.selectedCompany = $event
    // console.log($event)
  }
}
