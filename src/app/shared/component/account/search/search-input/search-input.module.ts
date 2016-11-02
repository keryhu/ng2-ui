import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";


import { SearchInputComponent } from './search-input.component';
import {DateModule} from "../../../input";
import {SearchCompanyDetailedModule} from "../search-detailed/";
import {SearchUserDetailedModule} from "../search-detailed";
import {SearchPageModule} from "../search-page";





@NgModule({
  imports: [CommonModule,ReactiveFormsModule,DateModule,
    MaterialModule.forRoot(),FormsModule,SearchUserDetailedModule,
    SearchCompanyDetailedModule,SearchPageModule],
  declarations: [SearchInputComponent],
  exports:[SearchInputComponent]
})
export class SearchInputModule { }
