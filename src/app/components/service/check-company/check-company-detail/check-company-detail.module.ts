import { NgModule } from '@angular/core';

import {SharedModule,CheckCompanyTemplateModule} from "../../../../shared";


import { CheckCompanyDetailComponent } from './check-company-detail.component';
import {CheckCompanyDetailRoutingModule} from "./check-company-detail-routing.module";
import {CheckCompanyDetailService} from "./check-company-detail.service";
import {CheckCompanyDetailResolveService} from "./check-company-detail-resolve.service";

@NgModule({
  imports: [SharedModule,CheckCompanyDetailRoutingModule,CheckCompanyTemplateModule],
  declarations: [CheckCompanyDetailComponent],
  providers:[CheckCompanyDetailService,CheckCompanyDetailResolveService]
})
export class CheckCompanyDetailModule { }
