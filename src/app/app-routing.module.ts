import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_helpers";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '**', redirectTo: ''}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
