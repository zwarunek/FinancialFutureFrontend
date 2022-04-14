import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateLevelsPageRoutingModule } from './create-levels-page-routing.module';
import { CreateLevelsPageComponent } from './create-levels-page.component';
import {HeadersModule} from "@features/headers/headers.module";
import {CompensationModule} from "@features/compensation/compensation.module";
import {FootersModule} from "@features/footers/footers.module";


@NgModule({
  declarations: [
    CreateLevelsPageComponent
  ],
  imports: [
    CommonModule,
    CreateLevelsPageRoutingModule,
    HeadersModule,
    CompensationModule,
    FootersModule
  ]
})
export class CreateLevelsPageModule { }
