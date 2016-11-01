import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared";
import {MaterialModule} from "@angular/material";

import { ServiceComponent } from './service.component';
import {ServiceRoutingModule} from "./service-routing.module";



@NgModule({

  imports: [SharedModule,ServiceRoutingModule,MaterialModule.forRoot()],
  declarations: [ServiceComponent],
})
export class ServiceModule { }
