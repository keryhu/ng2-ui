import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared";
import {MaterialModule} from "@angular/material";

import { EmailActivateComponent } from './email-activate.component';
import {EmailActivateRoutingModule} from "./email-activate-routing.module";
import {EmailStatusResolve} from "./email-status-resolve.service";


@NgModule({
  imports: [SharedModule,EmailActivateRoutingModule,MaterialModule.forRoot()],
  declarations: [EmailActivateComponent],
  providers: [EmailStatusResolve]
})
export class EmailActivateModule { }
