import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from "ng2-bootstrap";
import {MaterialModule} from "@angular/material";

import {DateParseModule} from "../../../../../pipe";
import {SortIconModule} from "../../../../tools";

import { SearchCompanyDetailedComponent } from './search-company-detailed.component';




@NgModule({
  imports: [CommonModule,PaginationModule,MaterialModule.forRoot(),
    DateParseModule,SortIconModule],
  declarations: [SearchCompanyDetailedComponent],
  exports: [SearchCompanyDetailedComponent]
})
export class SearchCompanyDetailedModule { }
