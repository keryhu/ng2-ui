/**
 * @Description : please enter the description
 * @date : 2016/10/9 下午2:54
 * @author : keryHu keryhu@hotmail.com
 */




import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {SpinnerGuard} from "../../../core";
import {CheckCompanyComponent} from "./check-company.component";

const checkCompanyRoutes: Routes=[
  {
    path: '',
    component: CheckCompanyComponent,
    canActivate:[SpinnerGuard],
    children:[
      {
        path:'',
        //component:CheckCompanyHomeComponent,
        loadChildren: 'app/components/service/check-company/check-company-home/check-company-home.module#CheckCompanyHomeModule'
      },
      {
        path:':id',
        //component:CheckCompanyHomeComponent,
        loadChildren: 'app/components/service/check-company/check-company-detail/check-company-detail.module#CheckCompanyDetailModule'
      }
    ]
  }
];



@NgModule({
  imports:[RouterModule.forChild(checkCompanyRoutes)],
  exports:[RouterModule]
})
export class CheckCompanyRoutingModule{}
