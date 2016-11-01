import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UncheckCompanyModule} from "../../../../shared";

import { WaitCheckCompanyComponent } from './wait-check-company.component';
import {WaitCheckCompanyRoutingModule} from "./wait-check-company-routing.module";
import {WaitCheckCompanyResolve} from "./wait-check-company-resolve.service";
import {WaitCheckCompanyService} from "./wait-check-company.service";

@NgModule({
  imports: [CommonModule,WaitCheckCompanyRoutingModule,UncheckCompanyModule],
  declarations: [WaitCheckCompanyComponent],
  providers:[WaitCheckCompanyResolve,WaitCheckCompanyService]
})
export class WaitCheckCompanyModule { }
