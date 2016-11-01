/**
 * @Description : please enter the description
 * @date : 16/9/3 下午5:12
 * @author : keryHu keryhu@hotmail.com
 */


import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule, ReactiveFormsModule}         from '@angular/forms';
import {RouterModule} from "@angular/router";


import {AccountActivateModule, SearchModules,
  DateModule,SortIconModule} from "./component";

import {DateParseModule} from "./pipe";
import {SearchBarModule} from "../core";





@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    AccountActivateModule,DateModule,SearchBarModule,DateParseModule,SortIconModule],

  declarations: [],

  exports: [CommonModule, ReactiveFormsModule, FormsModule, AccountActivateModule,
    SearchModules,DateModule,SearchBarModule,DateParseModule,SortIconModule

  ]

})
export class SharedModule {
}
