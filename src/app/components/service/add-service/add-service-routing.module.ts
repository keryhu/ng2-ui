/**
 * @Description : please enter the description
 * @date : 2016/9/29 下午7:16
 * @author : keryHu keryhu@hotmail.com
 */

import {NgModule} from "@angular/core";

import {AddServiceComponent} from "./add-service.component";
import {Routes, RouterModule} from "@angular/router";
import {XdidianAdminGuard,SpinnerGuard} from "../../../core";

const addServiceRoutes: Routes = [
  {
    path: '',
    component: AddServiceComponent,
    canActivate: [XdidianAdminGuard,SpinnerGuard],

  }
];


@NgModule({
  imports:[RouterModule.forChild(addServiceRoutes)],
  exports:[RouterModule]
})
export class AddServiceRoutingModule{}
