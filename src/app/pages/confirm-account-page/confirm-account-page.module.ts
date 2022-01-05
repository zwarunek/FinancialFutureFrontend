import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmAccountPageRoutingModule } from './confirm-account-page-routing.module';
import { ConfirmAccountPageComponent } from './confirm-account-page.component';
import {HeadersModule} from "@features/headers/headers.module";
import {LoginRegisterModule} from "@features/login-register/login-register.module";
import {FootersModule} from "@features/footers/footers.module";


@NgModule({
  declarations: [
    ConfirmAccountPageComponent
  ],
  imports: [
    CommonModule,
    ConfirmAccountPageRoutingModule,
    HeadersModule,
    LoginRegisterModule,
    FootersModule
  ]
})
export class ConfirmAccountPageModule { }
