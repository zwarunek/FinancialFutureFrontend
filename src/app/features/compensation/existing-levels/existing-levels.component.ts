import {Component, Input, OnInit} from '@angular/core';
import {CompensationService} from "@features/compensation/compensation.service";

@Component({
  selector: 'app-existing-levels',
  templateUrl: './existing-levels.component.html',
  styleUrls: ['./existing-levels.component.scss']
})
export class ExistingLevelsComponent implements OnInit {


  @Input() set company(value: string) {
    this.selectedCompany = value
    this.getLevels()
  };
  selectedCompany: string = ''

  levels: any[] = [];
  constructor(private compensationService: CompensationService) { }

  ngOnInit(): void {
  }

  getLevels() {
    this.compensationService.getExistingLevels(this.selectedCompany).subscribe((value: any) => {
      this.levels = value.body;
      console.log(JSON.stringify(value.body, null, 2))
    });

  }
}
