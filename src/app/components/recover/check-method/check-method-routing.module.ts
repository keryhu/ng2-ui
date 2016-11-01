/**
 * @Description : please enter the description
 * @date : 16/8/23 下午10:40
 * @author : keryHu keryhu@hotmail.com
 */



import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {CheckMethodComponent} from "./check-method.component";
import {SpinnerGuard} from "../../../core";


const checkMethodRoutes: Routes=[
  {
    path: '',
    component: CheckMethodComponent,
    canActivate:[SpinnerGuard]
  }
];


@NgModule({
  imports:[RouterModule.forChild(checkMethodRoutes)],
  exports:[RouterModule]
})
export class CheckMethodRoutingModule{}
