import {Component, Input, OnInit} from '@angular/core';
import {CompensationService} from "@features/compensation/compensation.service";
import {Company} from "@features/compensation/company-search/company-search.component";

@Component({
  selector: 'app-existing-levels',
  templateUrl: './existing-levels.component.html',
  styleUrls: ['./existing-levels.component.scss']
})
export class ExistingLevelsComponent implements OnInit {


  @Input() set company(value: Company | undefined) {
    console.log('company', value);
    this.selectedCompany = value
    if(this.selectedCompany?.name)
      this.getLevels(this.selectedCompany.name)
    else this.levels = []
  };
  loading = false;
  selectedCompany?: Company;


  levels: any[] = [];
  constructor(private compensationService: CompensationService) { }

  ngOnInit(): void {
  }

  getLevels(companyName: string) {
    this.loading = true;
    this.compensationService.getExistingLevels(companyName).subscribe((value: any) => {
      this.levels = value.body;
      this.levels.forEach((level) => {
        let stockCompensation = level.vestingSchedule.comp;
        let firstYearVestingPercent = 0;
        let firstYearBonus = 0;
        let totalBonus = 0;
        level.vestingSchedule.vestingYears.forEach((year: { year: number; percent: number; }) => {
          if(year.year === 1){
            firstYearVestingPercent = year.percent;
          }
        })
        level.bonuses.forEach((year: { year: number; dollarBonus: number; }) => {
          if(year.year === 1){
            firstYearBonus = year.dollarBonus;
          }
          totalBonus += year.dollarBonus;
        })

        level.firstYearTC = (firstYearVestingPercent/100) * stockCompensation + firstYearBonus + level.salary;
        level.avgTC =  (level.vestingSchedule.vestingYears.length>0?(stockCompensation / level.vestingSchedule.vestingYears.length):0)
          + level.salary
          + (level.bonuses.length>0?(totalBonus / level.bonuses.length):0);
      })
      console.log(JSON.stringify(this.levels, null, 2))
      this.loading = false;
    });

  }
}
