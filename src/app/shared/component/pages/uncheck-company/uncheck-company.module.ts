import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

import { UncheckCompanyComponent } from './uncheck-company.component';
import {UncheckCompanyService} from "./uncheck-company.service";
import {AddressModule} from "../../address";
import {FileUploadModule} from "../../input";


@NgModule({
  imports: [CommonModule,FileUploadModule,AddressModule,
    ReactiveFormsModule, FormsModule,MaterialModule.forRoot()],
  declarations: [UncheckCompanyComponent],
  providers: [UncheckCompanyService],
  exports: [UncheckCompanyComponent]
})
export class UncheckCompanyModule { }
