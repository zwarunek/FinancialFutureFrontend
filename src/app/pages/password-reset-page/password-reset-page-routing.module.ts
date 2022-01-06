import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PasswordResetPageComponent
} from "@app/pages/password-reset-page/password-reset-page.component";

const routes: Routes = [{path: '', component: PasswordResetPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetPageRoutingModule { }
