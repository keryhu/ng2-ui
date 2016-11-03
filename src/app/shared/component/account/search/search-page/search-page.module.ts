import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";
import {PaginationModule} from "ng2-bootstrap";

import { SearchPageComponent } from './search-page.component';
import {SortIconModule} from "../../../tools/";
import {DateParseModule} from "../../../../pipe";


@NgModule({
  imports: [CommonModule,PaginationModule,MaterialModule.forRoot(),SortIconModule,
    DateParseModule],
  declarations: [SearchPageComponent],
  exports: [SearchPageComponent]
})
export class SearchPageModule { }
