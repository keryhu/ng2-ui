import { NgModule } from '@angular/core';


import {MaterialModule} from "@angular/material";

import {SharedModule} from "../../../shared";
import {EmailExist,PhoneExist} from "../../../core";

import {AddServiceService} from "./add-service.service";
import { AddServiceComponent } from './add-service.component';
import {AddServiceRoutingModule} from "./add-service-routing.module";


@NgModule({
  imports: [SharedModule,AddServiceRoutingModule,MaterialModule.forRoot()],
  declarations: [AddServiceComponent],
  providers: [EmailExist,PhoneExist,AddServiceService]
})
export class AddServiceModule { }
