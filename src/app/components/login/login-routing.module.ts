/**
 * @Description : login的路由
 * @date : 16/8/19 下午4:37
 * @author : keryHu keryhu@hotmail.com
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {SpinnerGuard,UnauthenticatedGuard} from "../../core";


import {LoginComponent} from "./login.component";
import {IpBlockResolve} from "./ip-block-resolve.service";



const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard,SpinnerGuard],
    resolve: {
      block: IpBlockResolve
    },
  }
];

@NgModule({
  imports:[RouterModule.forChild(loginRoutes)],
  exports:[RouterModule]
})
export class LoginRoutingModule{}
