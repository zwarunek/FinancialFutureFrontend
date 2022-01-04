import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_helpers";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'passwordreset', component: PasswordResetComponent},

  {path: '**', redirectTo: ''}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
