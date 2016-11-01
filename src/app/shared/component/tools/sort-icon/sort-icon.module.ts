import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from "@angular/material";
import { SortIconComponent } from './sort-icon.component';

@NgModule({
  imports: [CommonModule,MaterialModule.forRoot()],
  declarations: [SortIconComponent],
  exports:[SortIconComponent]
})
export class SortIconModule { }
