import { NgModule } from '@angular/core';
import { ReComponent } from './re.component';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "@angular/material";
import {ReRoutingModule} from "./re-routing.module";

@NgModule({
  imports: [SharedModule,MaterialModule.forRoot(),ReRoutingModule],
  declarations: [ReComponent]
})
export class ReModule { }
