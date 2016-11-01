import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";

import {MonthDateModule} from "../../inline-edit";
import {NeedPasswordModule} from "../../account";
import {DateParseModule} from "../../../pipe";

import { EditBirthdayComponent } from './edit-birthday.component';



@NgModule({
  imports: [CommonModule,MonthDateModule,NeedPasswordModule,DateParseModule,
    MaterialModule.forRoot()],
  declarations: [EditBirthdayComponent],
  exports: [EditBirthdayComponent]
})
export class EditBirthdayModule { }
