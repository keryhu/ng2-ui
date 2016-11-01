/**
 * @Description : please enter the description
 * @date : 16/8/25 上午9:40
 * @author : keryHu keryhu@hotmail.com
 */


import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {CheckCodeComponent} from "./check-code.component";


import {SpinnerGuard} from "../../../core";


const checkCodeRoutes: Routes=[
  {
    path: '',
    component: CheckCodeComponent,
    canActivate:[SpinnerGuard]
  }
];


@NgModule({
  imports:[RouterModule.forChild(checkCodeRoutes)],
  exports:[RouterModule]
})
export class CheckCodeRoutingModule{}

