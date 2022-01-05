import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordPageRoutingModule } from './forgot-password-page-routing.module';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import {LoginRegisterModule} from "@features/login-register/login-register.module";
import {HeadersModule} from "@features/headers/headers.module";
import {FootersModule} from "@features/footers/footers.module";


@NgModule({
  declarations: [
    ForgotPasswordPageComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordPageRoutingModule,
    LoginRegisterModule,
    HeadersModule,
    FootersModule
  ]
})
export class ForgotPasswordPageModule { }
