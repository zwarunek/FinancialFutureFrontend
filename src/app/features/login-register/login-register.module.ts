import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "@features/login-register/login/login.component";
import {RegisterComponent} from "@features/login-register/register/register.component";
import {MessagesModule} from "primeng/messages";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {
  ConfirmAccountComponent
} from "@features/login-register/confirm-account/confirm-account.component";
import {
  ForgotPasswordComponent
} from "@features/login-register/forgot-password/forgot-password.component";
import {
  PasswordResetComponent
} from "@features/login-register/password-reset/password-reset.component";
import {CaptchaModule} from "primeng/captcha";
import {DynamicFormModule} from "@shared/dynamic-form/dynamic-form.module";
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ForgotPasswordComponent,
    PasswordResetComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ForgotPasswordComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    MessagesModule,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    CaptchaModule,
    DynamicFormModule,
    CardModule,
    FormsModule
  ]
})
export class LoginRegisterModule { }
