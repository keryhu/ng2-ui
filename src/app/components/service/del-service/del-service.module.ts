import { NgModule } from '@angular/core';
import {SharedModule} from "../../../shared";
import {MaterialModule} from "@angular/material";



import {DelServiceRoutingModule} from "./del-service-routing.module";
import {DelServiceService} from "./del-service.service";
import {DelServiceComponent} from "./del-service.component";
import {DelServiceResolve} from "./del-service-resolve.service";





@NgModule({
  imports: [SharedModule,DelServiceRoutingModule,MaterialModule.forRoot()],
  declarations: [DelServiceComponent],
  providers: [DelServiceService,DelServiceResolve]
})
export class DelServiceModule { }
