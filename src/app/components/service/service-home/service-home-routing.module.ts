/**
 * @Description : please enter the description
 * @date : 2016/9/29 上午11:10
 * @author : keryHu keryhu@hotmail.com
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {ServiceHomeComponent} from "./service-home.component";
import {SpinnerGuard} from "../../../core";

const serviceHomeRoutes: Routes=[
  {
    path: '',
    component: ServiceHomeComponent,
    canActivate:[SpinnerGuard]
  }
];



@NgModule({
  imports:[RouterModule.forChild(serviceHomeRoutes)],
  exports:[RouterModule]
})
export class ServiceHomeRoutingModule{}
