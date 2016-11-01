import { NgModule } from '@angular/core';

import {SharedModule} from "../../../shared";
import {MaterialModule} from "@angular/material";

import { NewPasswordComponent } from './new-password.component';
import {NewPasswordResolve} from "./new-password-resolve.service";
import {NewPasswordService} from "./new-password.service";
import {NewPasswordRoutingModule} from "./new-password-routing.module";


@NgModule({
  imports: [SharedModule,NewPasswordRoutingModule,MaterialModule.forRoot()],
  declarations: [NewPasswordComponent],
  providers: [NewPasswordService,NewPasswordResolve]
})
export class NewPasswordModule { }
