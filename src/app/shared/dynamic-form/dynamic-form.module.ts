// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {Card, CardModule} from './dynamic-form.component';
//
//
//
// @NgModule({
//   declarations: [
//     Card
//   ],
//   exports: [
//     CardModule
//   ],
//   imports: [
//     CommonModule
//   ]
// })
// export class DynamicFormModule { }
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "primeng/api";
import {DynamicFormComponent} from "@shared/dynamic-form/dynamic-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {MessagesModule} from "primeng/messages";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, RippleModule, PasswordModule, MessagesModule],
  exports: [DynamicFormComponent, SharedModule],
  declarations: [DynamicFormComponent, DynamicFormQuestionComponent]
})
export class DynamicFormModule { }
