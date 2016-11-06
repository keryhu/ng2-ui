import { NgModule } from '@angular/core';

import {CheckCompanyTemplateModule,SharedModule} from "../../../../shared";


import { WaitCheckCompanyComponent } from './wait-check-company.component';
import {WaitCheckCompanyRoutingModule} from "./wait-check-company-routing.module";
import {WaitCheckCompanyResolve} from "./wait-check-company-resolve.service";
import {WaitCheckCompanyService} from "./wait-check-company.service";

@NgModule({
  imports: [SharedModule,WaitCheckCompanyRoutingModule,CheckCompanyTemplateModule],
  declarations: [WaitCheckCompanyComponent],
  providers:[WaitCheckCompanyResolve,WaitCheckCompanyService]
})
export class WaitCheckCompanyModule { }
