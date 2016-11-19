import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";

import { TopMessageComponent } from './top-message.component';
import {TopMessageService} from "./top-message.service";


@NgModule({
  imports: [CommonModule,MaterialModule.forRoot()],
  declarations: [TopMessageComponent],
  providers:[TopMessageService],
  exports:[TopMessageComponent]
})
export class TopMessageModule { }
