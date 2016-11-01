import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { RechargeComponent } from './recharge.component';
import {RechargeRoutingModule} from "./recharge-routing.module";
import {MaterialModule} from "@angular/material";
import { PaginationModule } from 'ng2-bootstrap'

@NgModule({
  imports: [CommonModule,RechargeRoutingModule,NgbModule.forRoot(),
    MaterialModule.forRoot(),PaginationModule,],
  declarations: [RechargeComponent]
})
export class RechargeModule { }
