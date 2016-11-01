import { NgModule } from '@angular/core';
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../../../shared";

import { CheckMethodComponent } from './check-method.component';
import {CheckMethodService} from "./check-method.service";
import {CheckMethodRoutingModule} from "./check-method-routing.module";


@NgModule({
  imports: [SharedModule,CheckMethodRoutingModule,MaterialModule.forRoot()],
  declarations: [CheckMethodComponent],
  providers: [CheckMethodService]
})
export class CheckMethodModule { }
