import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UncheckCompanyModule} from "../../../../shared";

import { CreateCompanyComponent } from './create-company.component';
import {CreateCompanyRoutingModule} from "./create-company-routing.module";
import {CreateCompanyResolve} from "./create-company-resolve.service";
import {CreateCompanyService} from "./create-company.service";

@NgModule({
  imports: [CommonModule,CreateCompanyRoutingModule,UncheckCompanyModule],
  declarations: [CreateCompanyComponent],
  providers: [CreateCompanyResolve,CreateCompanyService]
})
export class CreateCompanyModule { }
