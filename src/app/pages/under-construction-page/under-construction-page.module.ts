import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UnderConstructionPageComponent
} from "@app/pages/under-construction-page/under-construction-page.component";
import {
  UnderConstructionPageRoutingModule
} from "@app/pages/under-construction-page/under-construction-page-routing.module";
import {HeadersModule} from "@features/headers/headers.module";
import {TooltipModule} from "primeng/tooltip";



@NgModule({
  declarations: [
    UnderConstructionPageComponent
  ],
  imports: [
    CommonModule,
    UnderConstructionPageRoutingModule,
    HeadersModule,
    TooltipModule
  ]
})
export class UnderConstructionPageModule { }
