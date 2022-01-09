import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  UnderConstructionPageComponent
} from "@app/pages/under-construction-page/under-construction-page.component";

const routes: Routes = [{path: '', component: UnderConstructionPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderConstructionPageRoutingModule { }
