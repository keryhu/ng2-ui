import { NgModule } from '@angular/core';
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../../../../shared";

import { CheckCompanyHomeComponent } from './check-company-home.component';
import {CheckCompanyHomeRoutingModule} from "./check-company-home-routing.module";
import {SearchPageModule} from "../../../../shared";



@NgModule({
  imports: [SharedModule,CheckCompanyHomeRoutingModule,SearchPageModule,
    MaterialModule.forRoot()],
  declarations: [CheckCompanyHomeComponent]
})
export class CheckCompanyHomeModule { }
