import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";
import {RouterModule} from "@angular/router";

import { SideMenuComponent } from './side-menu.component';




@NgModule({
  imports: [CommonModule,MaterialModule.forRoot(),RouterModule],
  declarations: [SideMenuComponent],
  exports: [SideMenuComponent]
})
export class SideMenuModule { }
