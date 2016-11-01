/**
 * @Description : please enter the description
 * @date : 2016/9/30 下午4:00
 * @author : keryHu keryhu@hotmail.com
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";


import {XdidianAdminGuard,SpinnerGuard} from "../../../core";
import {DelServiceComponent} from "./del-service.component";
import {DelServiceResolve} from "./del-service-resolve.service";


const delServiceRoutes: Routes=[
  {
    path: '',
    component: DelServiceComponent,
    canActivate: [XdidianAdminGuard,SpinnerGuard],
    resolve: {
      serviceInfo: DelServiceResolve
    }
  }
];




@NgModule({
  imports:[RouterModule.forChild(delServiceRoutes)],
  exports:[RouterModule]
})
export class DelServiceRoutingModule{}
