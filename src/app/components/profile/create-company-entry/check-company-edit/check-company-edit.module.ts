import { NgModule } from '@angular/core';
import {MaterialModule} from "@angular/material";

import {SharedModule,CheckCompanyTemplateModule,CheckCompanyTemplateService} from "../../../../shared";

import {CheckCompanyEditRoutingModule} from "./check-company-edit-routing.module";
import {CheckCompanyEditComponent} from "./check-company-edit.component";
import {CheckCompanyEditResolve} from "./check-company-edit-resolve.service";



@NgModule({
  imports: [SharedModule,MaterialModule.forRoot(),
    CheckCompanyEditRoutingModule,CheckCompanyTemplateModule],
  declarations: [CheckCompanyEditComponent],
  providers:[CheckCompanyEditResolve,CheckCompanyTemplateService]
})
export class CheckCompanyEditModule { }
