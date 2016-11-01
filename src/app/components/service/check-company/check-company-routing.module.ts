/**
 * @Description : please enter the description
 * @date : 2016/10/9 下午2:54
 * @author : keryHu keryhu@hotmail.com
 */




import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {SpinnerGuard} from "../../../core";
import {CheckCompanyComponent} from "./check-company.component";
import {CheckCompanyResolve} from "./check-company-resolve.service";

const checkCompanyRoutes: Routes=[
  {
    path: '',
    component: CheckCompanyComponent,
    canActivate:[SpinnerGuard],
    resolve:{
      unCheckedCompany:CheckCompanyResolve
    }

  }
];



@NgModule({
  imports:[RouterModule.forChild(checkCompanyRoutes)],
  exports:[RouterModule]
})
export class CheckCompanyRoutingModule{}
