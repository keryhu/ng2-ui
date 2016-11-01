/**
 * @Description : please enter the description
 * @date : 16/8/26 下午3:33
 * @author : keryHu keryhu@hotmail.com
 */


import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {NewPasswordComponent} from "./new-password.component";
import {NewPasswordResolve} from "./new-password-resolve.service";
import {SpinnerGuard} from "../../../core";


const newPasswordRoutes: Routes=[
  {
    path: '',
    component: NewPasswordComponent,
    canActivate:[SpinnerGuard],
    resolve: {
      accountAndTokenMatch: NewPasswordResolve
    }
  }
];



@NgModule({
  imports:[RouterModule.forChild(newPasswordRoutes)],
  exports:[RouterModule]
})
export class NewPasswordRoutingModule{}
