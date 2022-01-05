import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';
import {HeadersModule} from "@features/headers/headers.module";
import {LoginRegisterModule} from "@features/login-register/login-register.module";
import {FootersModule} from "@features/footers/footers.module";


@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    RegisterPageRoutingModule,
    LoginRegisterModule,
    FootersModule
  ]
})
export class RegisterPageModule { }
