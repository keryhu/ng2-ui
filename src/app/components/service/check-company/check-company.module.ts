import { NgModule } from '@angular/core';

import {SharedModule,UncheckCompanyModule} from "../../../shared";

import { CheckCompanyComponent } from './check-company.component';
import {CheckCompanyRoutingModule} from "./check-company-routing.module";

@NgModule({
  imports: [SharedModule,CheckCompanyRoutingModule,UncheckCompanyModule],
  declarations: [CheckCompanyComponent]
})
export class CheckCompanyModule { }
