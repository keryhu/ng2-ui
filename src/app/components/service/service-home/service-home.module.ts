import { NgModule } from '@angular/core';
import {SharedModule} from "../../../shared";


import { ServiceHomeComponent } from './service-home.component';
import {ServiceHomeRoutingModule} from "./service-home-routing.module";

@NgModule({
  imports: [SharedModule,ServiceHomeRoutingModule],
  declarations: [ServiceHomeComponent],
})
export class ServiceHomeModule { }
