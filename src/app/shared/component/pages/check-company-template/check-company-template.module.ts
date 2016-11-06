import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AddressModule} from "../../address";
import {FileUploadModule} from "../../input";
import { CheckCompanyTemplateComponent } from './check-company-template.component';
import {CheckCompanyTemplateService} from "./check-company-template.service";


@NgModule({
  imports: [CommonModule,FileUploadModule,AddressModule,
    ReactiveFormsModule, FormsModule,MaterialModule.forRoot()],
  declarations: [CheckCompanyTemplateComponent],
  providers:[CheckCompanyTemplateService],
  exports:[CheckCompanyTemplateComponent]
})
export class CheckCompanyTemplateModule { }
