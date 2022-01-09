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
import { StockCompSelectorComponent } from './stock-comp-selector/stock-comp-selector.component';
import { ExistingLevelsComponent } from './existing-levels/existing-levels.component';
import { CompensationInputComponent } from './compensation-input/compensation-input.component';
import {SliderModule} from "primeng/slider";



@NgModule({
  declarations: [
    CompanySearchComponent,
    CompensationComponent,
    StockCompSelectorComponent,
    ExistingLevelsComponent,
    CompensationInputComponent
  ],
  exports: [
    CompanySearchComponent,
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
    SliderModule
  ]
})
export class CompensationModule { }
