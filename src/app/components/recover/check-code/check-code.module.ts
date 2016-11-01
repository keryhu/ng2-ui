import { NgModule } from '@angular/core';
import {MaterialModule} from "@angular/material";
import {SharedModule} from "../../../shared";


import { CheckCodeComponent } from './check-code.component';
import {CheckCodeRoutingModule} from "./check-code-routing.module";


@NgModule({
  imports: [SharedModule,CheckCodeRoutingModule,MaterialModule.forRoot()],
  declarations: [CheckCodeComponent],
})
export class CheckCodeModule { }
