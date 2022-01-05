import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAuthComponent } from './header-auth/header-auth.component';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import {HeaderDefaultComponent} from "@features/headers/header-default/header-default.component";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    HeaderAuthComponent,
    HeaderDefaultComponent
  ],
  exports: [
    HeaderAuthComponent,
    HeaderDefaultComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    SharedModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    RippleModule
  ]
})
export class HeadersModule { }
