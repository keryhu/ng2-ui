/**
 * @Description : please enter the description
 * @date : 16/8/19 上午9:44
 * @author : keryHu keryhu@hotmail.com
 */


import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {ProfileComponent} from "./profile.component";
import {AuthenticatedGuard} from "../../core";


const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],    //spinnerGuard 不能放在此处，需放在下面各个路由
    children: [
      {
        path: 'home',
        loadChildren: 'app/components/profile/profile-home/profile-home.module#ProfileHomeModule'
      },
      {
        path: 'personal-set',
        loadChildren: 'app/components/profile/personal-set/personal-set.module#PersonalSetModule'
      },
      {
        path:'create-company',
        loadChildren: 'app/components/profile/create-company-entry/create-company-entry.module#CreateCompanyEntryModule'
      }
    ]
  }

];



@NgModule({
  imports:[RouterModule.forChild(profileRoutes)],
  exports:[RouterModule]
})
export class ProfileRoutingModule{}
