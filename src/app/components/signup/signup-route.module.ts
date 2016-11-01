
/**
 * @Description : please enter the description
 * @date : 16/6/21 上午11:49
 * @author : keryHu keryhu@hotmail.com
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {SignupComponent} from "./signup.component";
import {SpinnerGuard,UnauthenticatedGuard} from "../../core";



const signupRoutes: Routes = [
  {
    path: '',
    component: SignupComponent,
    canActivate:[UnauthenticatedGuard,SpinnerGuard]   //设定了如果已经登录,那么不能访问注册页面  /signup
  }
];




@NgModule({
  imports:[RouterModule.forChild(signupRoutes)],
  exports:[RouterModule]
})
export class SignupRoutingModule{}
