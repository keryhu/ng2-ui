/**
 * @Description : please enter the description
 * @date : 16/8/22 下午9:55
 * @author : keryHu keryhu@hotmail.com
 */



import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {EmailActivateComponent} from "./email-activate.component";
import {EmailStatusResolve} from "./email-status-resolve.service";
import {SpinnerGuard} from "../../core";



const emailActivateRoutes: Routes = [
  {
    path: '',
    component: EmailActivateComponent,
    canActivate:[SpinnerGuard],
    resolve: {
      emailStatus: EmailStatusResolve
   }
  }
];



@NgModule({
  imports:[RouterModule.forChild(emailActivateRoutes)],
  exports:[RouterModule]
})
export class EmailActivateRoutingModule{}
