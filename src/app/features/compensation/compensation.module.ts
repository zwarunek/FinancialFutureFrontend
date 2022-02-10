import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySearchComponent } from './company-search/company-search.component';
import {InputTextModule} from "primeng/inputtext";
import {VirtualScrollerModule} from "primeng/virtualscroller";
import {SkeletonModule} from "primeng/skeleton";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CoreModule} from "@core/core.module";
import { CompensationComponent } from './compensation.component';
import { StockCompSelectorComponent } from './compensation-input/stock-comp-selector/stock-comp-selector.component';
import { ExistingLevelsComponent } from './existing-levels/existing-levels.component';
import { CompensationInputComponent } from './compensation-input/compensation-input.component';
import {SliderModule} from "primeng/slider";
import {TagModule} from "primeng/tag";
import {DropdownModule} from "primeng/dropdown";
import {TooltipModule} from "primeng/tooltip";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {ChipModule} from "primeng/chip";
import {CompanySearchService} from "@features/compensation/company-search/company-search.service";



@NgModule({
  declarations: [
    CompanySearchComponent,
    CompensationComponent,
    StockCompSelectorComponent,
    ExistingLevelsComponent,
    CompensationInputComponent
  ],
  exports: [
    CompensationComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    VirtualScrollerModule,
    SkeletonModule,
    OverlayPanelModule,
    FormsModule,
    ButtonModule,
    CoreModule,
    SliderModule,
    TagModule,
    DropdownModule,
    TooltipModule,
    InputNumberModule,
    TableModule,
    ChipsModule,
    ChipModule
  ],
  providers: [
    // CompanySearchComponent,
    // StockCompSelectorComponent,
    CompanySearchService,
    ExistingLevelsComponent
  ]
})
export class CompensationModule { }
