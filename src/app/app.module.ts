import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ErrorInterceptor} from "@core/interceptors/error.interceptor";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeadersModule} from "@features/headers/headers.module";
import {LoginRegisterModule} from "@features/login-register/login-register.module";
import {JwtInterceptor} from "@core/interceptors/jwt.interceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ProgressSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule, HeadersModule, LoginRegisterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
