

/**
 * @Description : please enter the description
 * @date : 2016/11/3 下午2:03
 * @author : keryHu keryhu@hotmail.com
 */


import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {SpinnerGuard} from "../../../../core";

import {CheckCompanyDetailComponent} from "./check-company-detail.component";


const checkCompanyDetailRoutes: Routes=[
  {
    path: '',
    component: CheckCompanyDetailComponent,
    canActivate:[SpinnerGuard],
  }
];



@NgModule({
  imports:[RouterModule.forChild(checkCompanyDetailRoutes)],
  exports:[RouterModule]
})
export class CheckCompanyDetailRoutingModule{}
