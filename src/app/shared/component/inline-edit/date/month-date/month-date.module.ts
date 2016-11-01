import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule}  from '@angular/forms';
import {MaterialModule} from "@angular/material";

import {DateParseModule} from "../../../../pipe";

import {MonthDateComponent} from './month-date.component';




@NgModule({
  imports: [CommonModule, ReactiveFormsModule,DateParseModule,
    MaterialModule.forRoot()],
  declarations: [MonthDateComponent],
  exports: [MonthDateComponent]
})
export class MonthDateModule {
}
