import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {RouterModule} from "@angular/router";

import { ChangePasswordComponent } from './change-password.component';
import {ChangePasswordService} from "./change-password.service";




@NgModule({
  imports: [CommonModule,ReactiveFormsModule,RouterModule,
    MaterialModule.forRoot()],
  declarations: [ChangePasswordComponent],
  providers: [ChangePasswordService],
  exports: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
