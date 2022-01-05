import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import {LoginPageComponent} from "@app/pages/login-page/login-page.component";
import {HeadersModule} from "@features/headers/headers.module";
import {LoginRegisterModule} from "@features/login-register/login-register.module";
import {FootersModule} from "@features/footers/footers.module";


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    LoginPageRoutingModule,
    LoginRegisterModule,
    FootersModule
  ]
})
export class LoginPageModule { }
