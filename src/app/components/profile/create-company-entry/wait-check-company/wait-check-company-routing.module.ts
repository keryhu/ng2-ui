
/**
 * @Description : please enter the description
 * @date : 2016/9/26 下午10:23
 * @author : keryHu keryhu@hotmail.com
 */


import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";


import {SpinnerGuard} from "../../../../core";

import {WaitCheckCompanyComponent} from "./wait-check-company.component";
import {WaitCheckCompanyResolve} from "./wait-check-company-resolve.service";

const waitCheckRoutes: Routes = [
  {
    path: '',
    component: WaitCheckCompanyComponent,
    canActivate:[SpinnerGuard],
    resolve: {
      waitCheckResolveInfo: WaitCheckCompanyResolve
    }
  }
];


@NgModule({
  imports:[RouterModule.forChild(waitCheckRoutes)],
  exports:[RouterModule]
})
export class WaitCheckCompanyRoutingModule{}
