import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordResetPageRoutingModule } from './password-reset-page-routing.module';
import { PasswordResetPageComponent } from './password-reset-page.component';
import {LoginRegisterModule} from "@features/login-register/login-register.module";
import {HeadersModule} from "@features/headers/headers.module";
import {FootersModule} from "@features/footers/footers.module";


@NgModule({
  declarations: [
    PasswordResetPageComponent
  ],
  imports: [
    CommonModule,
    PasswordResetPageRoutingModule,
    LoginRegisterModule,
    HeadersModule,
    FootersModule
  ]
})
export class PasswordResetPageModule { }
