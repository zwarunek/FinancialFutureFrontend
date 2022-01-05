import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ConfirmAccountPageComponent
} from "@app/pages/confirm-account-page/confirm-account-page.component";

const routes: Routes = [{path: '', component: ConfirmAccountPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmAccountPageRoutingModule { }
