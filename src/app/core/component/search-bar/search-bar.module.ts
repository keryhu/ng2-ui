import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";

import { SearchBarComponent } from './search-bar.component';


@NgModule({
  imports: [CommonModule,MaterialModule.forRoot()],
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
