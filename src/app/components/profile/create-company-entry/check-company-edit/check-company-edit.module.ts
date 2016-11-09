import { NgModule } from '@angular/core';
import {MaterialModule} from "@angular/material";

import {SharedModule,CheckCompanyTemplateModule,CheckCompanyTemplateService} from "../../../../shared";

import {CheckCompanyEditRoutingModule} from "./check-company-edit-routing.module";
import {CheckCompanyEditComponent} from "./check-company-edit.component";
import {CheckCompanyForNameResolve} from "./check-company-for-name-resolve.service";
import {CheckCompanyEditService} from "./check-company-edit.service";
import {CheckCompanyForCompanyResolve} from "./check-company-for-company-resolve";



@NgModule({
  imports: [SharedModule,MaterialModule.forRoot(),
    CheckCompanyEditRoutingModule,CheckCompanyTemplateModule],
  declarations: [CheckCompanyEditComponent],
  providers:[CheckCompanyForNameResolve,CheckCompanyTemplateService,
    CheckCompanyEditService,CheckCompanyForCompanyResolve]
})
export class CheckCompanyEditModule { }
