import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from "@features/compensation/company-search/company-search.component";
import {ExistingLevelsComponent} from "@features/compensation/existing-levels/existing-levels.component";
import {CompensationInputComponent} from "@features/compensation/compensation-input/compensation-input.component";

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.scss']
})
export class CompensationComponent implements OnInit {

  selectedCompany?: Company
  existingLevels: any[] = []
  @ViewChild(ExistingLevelsComponent) existingLevelsComponent?: ExistingLevelsComponent
  @ViewChild(CompensationInputComponent) compensationInput?: CompensationInputComponent

  constructor() { }

  ngOnInit(): void {
  }

  updateSelectedCompany($event: Company | undefined) {
    this.selectedCompany = $event
  }

  updateExistingLevels($event: any[]) {
    this.existingLevels = $event
  }

  editLevel(event: any) {
    this.compensationInput?.editLevel(event)
  }

  saveLevel() {
    this.existingLevelsComponent?.refreshLevels();
  }
}
