
/**
 * @Description : please enter the description
 * @date : 16/7/10 下午1:22
 * @author : keryHu keryhu@hotmail.com
 */

import {NgModule} from "@angular/core";

import {Routes, RouterModule} from "@angular/router";
import {AccessDeniedComponent} from "./access-denied.component";

import {SpinnerGuard} from "../../../../core";

const accessDeniedRoutes:Routes=[
  {
    path: '',
    component: AccessDeniedComponent,
    canActivate:[SpinnerGuard]
  }
];




@NgModule({
  imports:[RouterModule.forChild(accessDeniedRoutes)],
  exports:[RouterModule]
})
export class AccessDeniedRoutingModule{}
