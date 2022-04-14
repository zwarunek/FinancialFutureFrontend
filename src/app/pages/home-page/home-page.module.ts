import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import {HeadersModule} from "@features/headers/headers.module";
import {FootersModule} from "@features/footers/footers.module";
import {CompensationModule} from "@features/compensation/compensation.module";
import {HomeModule} from "@app/features/home/home.module";


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HeadersModule,
    FootersModule,
    CompensationModule,
    HomeModule
  ]
})
export class HomePageModule { }
