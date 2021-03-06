import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";
import {RouterModule} from "@angular/router";

import { TopNavbarComponent } from './top-navbar.component';
import {SearchBarModule} from "../search-bar";
import {TopMessageModule,TopMessageService} from "../top-message";





@NgModule({
  imports: [CommonModule,MaterialModule.forRoot(),RouterModule,SearchBarModule,
  TopMessageModule],
  declarations: [TopNavbarComponent],
  exports: [TopNavbarComponent]
})
export class TopNavbarModule { }
