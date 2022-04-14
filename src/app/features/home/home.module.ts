import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {TableModule} from "primeng/table";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {CoreModule} from "@core/core.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    AutoCompleteModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    InputTextModule,
    CoreModule
  ]
})
export class HomeModule { }
