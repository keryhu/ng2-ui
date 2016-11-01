import { NgModule } from '@angular/core';

import {SharedModule} from "../../shared";

import {RecoverRoutingModule} from "./recover-routing.module";
import {RecoverComponent} from "./recover.component";

@NgModule({
  imports: [SharedModule, RecoverRoutingModule],
  declarations: [RecoverComponent],
})
export class RecoverModule { }
