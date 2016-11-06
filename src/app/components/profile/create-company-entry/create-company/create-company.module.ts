import { NgModule } from '@angular/core';


import { CreateCompanyComponent } from './create-company.component';
import {CreateCompanyRoutingModule} from "./create-company-routing.module";
import {CreateCompanyResolve} from "./create-company-resolve.service";
import {CheckCompanyTemplateService,CheckCompanyTemplateModule,
  SharedModule} from "../../../../shared";

@NgModule({
  imports: [SharedModule,CreateCompanyRoutingModule,CheckCompanyTemplateModule],
  declarations: [CreateCompanyComponent],
  providers: [CreateCompanyResolve,CheckCompanyTemplateService]
})
export class CreateCompanyModule { }
