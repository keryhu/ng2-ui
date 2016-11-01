import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgbModule, NgbDatepickerI18n} from "@ng-bootstrap/ng-bootstrap";

import {DateComponent, CustomDatepickerI18n} from './date.component';


@NgModule({
  imports: [CommonModule,NgbModule.forRoot(),FormsModule],
  declarations: [DateComponent],
  providers:[ {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}],
  exports: [DateComponent]
})
export class DateModule { }
