
/**
 * @Description : please enter the description
 * @date : 2016/11/3 下午1:48
 * @author : keryHu keryhu@hotmail.com
 */


import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SpinnerGuard} from "../../../../core/component/spinner/spinner.guard";
import {CheckCompanyHomeComponent} from "./check-company-home.component";

const checkCompanyHomeRoutes: Routes=[
  {
    path: '',
    component: CheckCompanyHomeComponent,
    canActivate:[SpinnerGuard]
  }
];



@NgModule({
  imports:[RouterModule.forChild(checkCompanyHomeRoutes)],
  exports:[RouterModule]
})
export class CheckCompanyHomeRoutingModule{}
