import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

import { AccountActivateComponent } from './account-activate.component';
import {AccountActivateService} from "./account-activate.service";
import {CountdownComponent} from "../countdown";


@NgModule({
  imports: [CommonModule,ReactiveFormsModule, FormsModule,
    MaterialModule.forRoot()],
  declarations: [AccountActivateComponent,CountdownComponent],
  providers: [AccountActivateService],
  exports: [AccountActivateComponent]
})
export class AccountActivateModule { }
