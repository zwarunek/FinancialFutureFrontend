import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  // {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  // {path: 'forgotpassword', component: ForgotPasswordComponent},
  // {path: 'passwordreset', component: PasswordResetComponent},
  // {path: 'register/confirm', component: ConfirmAccountComponent},
  //
  // {path: '**', redirectTo: ''}

  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register-page/register-page.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgot-password-page/forgot-password-page.module').then((m) => m.ForgotPasswordPageModule),
  },
  {
    path: 'passwordreset',
    loadChildren: () => import('./pages/password-reset-page/password-reset-page.module').then((m) => m.PasswordResetPageModule),
  },
  {
    path: 'register/confirm',
    loadChildren: () => import('./pages/confirm-account-page/confirm-account-page.module').then((m) => m.ConfirmAccountPageModule),
  },
  {path: '**', redirectTo: ''}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
