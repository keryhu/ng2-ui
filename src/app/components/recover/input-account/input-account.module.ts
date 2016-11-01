import { NgModule } from '@angular/core';

import {MaterialModule} from "@angular/material";

import {SharedModule} from "../../../shared/";

import { InputAccountComponent } from './input-account.component';
import {InputAccountService} from "./input-account.service";
import {InputAccountRoutingModule} from "./input-account-routing.module";


@NgModule({
  imports: [SharedModule,InputAccountRoutingModule,MaterialModule.forRoot()],
  declarations: [InputAccountComponent],
  providers: [InputAccountService]
})
export class InputAccountModule { }
