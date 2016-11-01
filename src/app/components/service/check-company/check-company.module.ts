import { NgModule } from '@angular/core';

import {SharedModule,UncheckCompanyModule} from "../../../shared";

import { CheckCompanyComponent } from './check-company.component';
import {CheckCompanyResolve} from "./check-company-resolve.service";
import {CheckCompanyService} from "./check-company.service";
import {CheckCompanyRoutingModule} from "./check-company-routing.module";

@NgModule({
  imports: [SharedModule,CheckCompanyRoutingModule,UncheckCompanyModule],
  declarations: [CheckCompanyComponent],
  providers:[CheckCompanyService,CheckCompanyResolve]
})
export class CheckCompanyModule { }
