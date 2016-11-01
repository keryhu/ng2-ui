import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import { NeedPasswordComponent } from './need-password.component';
import {NeedPasswordService} from "./need-password.service";



@NgModule({
  imports: [CommonModule,ReactiveFormsModule, FormsModule,MaterialModule.forRoot()],
  declarations: [NeedPasswordComponent],
  providers: [NeedPasswordService],
  exports: [NeedPasswordComponent]
})
export class NeedPasswordModule { }
