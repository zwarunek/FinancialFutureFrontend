import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@core/guards/auth.guard";
import {CreateLevelsPageComponent} from "@app/pages/create-levels-page/create-levels-page.component";

const routes: Routes = [{ path: '', component: CreateLevelsPageComponent, canActivate: [AuthGuard] }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLevelsPageRoutingModule { }
