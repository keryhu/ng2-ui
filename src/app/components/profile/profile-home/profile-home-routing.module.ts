/**
 * @Description : please enter the description
 * @date : 2016/10/14 上午9:17
 * @author : keryHu keryhu@hotmail.com
 */



import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";


import {SpinnerGuard} from "../../../core";
import {ProfileHomeComponent} from "./profile-home.component";



const profileHomeRoutes: Routes = [
  {
    path: '',
    component: ProfileHomeComponent,
    canActivate: [SpinnerGuard]

  }
];



@NgModule({
  imports:[RouterModule.forChild(profileHomeRoutes)],
  exports:[RouterModule]
})

export class ProfileHomeRoutingModule{}
