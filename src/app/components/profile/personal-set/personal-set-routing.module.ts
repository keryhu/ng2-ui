/**
 * @Description : 个人信息的录音
 * @date : 16/8/19 下午4:43
 * @author : keryHu keryhu@hotmail.com
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";


import {SpinnerGuard} from "../../../core";
import {PersonalSetComponent} from "./personal-set.component";
import {PersonalSetResolve} from "./personal-set-resolve.service";


const personalSetRoutes: Routes = [
  {
    path: '',
    component: PersonalSetComponent,
    canActivate:[SpinnerGuard],
    resolve: {
      personalSet: PersonalSetResolve
    },

  }
];

@NgModule({
  imports:[RouterModule.forChild(personalSetRoutes)],
  exports:[RouterModule]
})
export class PersonalSetRoutingModule{}
