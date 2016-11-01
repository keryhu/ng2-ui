import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ng2-bootstrap'
import {MaterialModule} from "@angular/material";

import {SortIconModule} from "../../../../tools";
import {DateParseModule} from "../../../../../pipe/";
import {ServiceUserDialog} from "../../../../dialog";

import { SearchUserDetailedComponent } from './search-user-detailed.component';






@NgModule({
  imports: [CommonModule,PaginationModule,MaterialModule.forRoot(),
    DateParseModule,SortIconModule],
  declarations: [SearchUserDetailedComponent,ServiceUserDialog],
  exports:[SearchUserDetailedComponent],
  entryComponents:[ServiceUserDialog]
})
export class SearchUserDetailedModule { }
