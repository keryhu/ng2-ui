
/**
 * @Description : please enter the description
 * @date : 2016/10/23 下午8:23
 * @author : keryHu keryhu@hotmail.com
 */

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";


import {SpinnerGuard} from "../../../core";
import {RechargeComponent} from "./recharge.component";


const rechargeRoutes: Routes=[
  {
    path: '',
    component: RechargeComponent,
    canActivate:[SpinnerGuard]

  }
];



@NgModule({
  imports:[RouterModule.forChild(rechargeRoutes)],
  exports:[RouterModule]
})
export class RechargeRoutingModule{}
