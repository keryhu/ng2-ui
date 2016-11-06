/**
 * @Description : please enter the description
 * @date : 16/8/19 上午9:44
 * @author : keryHu keryhu@hotmail.com
 */


import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {CreateCompanyEntryComponent} from "./create-company-entry.component";
import {OnlyCustomerGuard} from "../../../core";


const createCompanyEntryRoutes: Routes = [
  {
    path: '',
    component: CreateCompanyEntryComponent,
    canActivate: [OnlyCustomerGuard],    //只能 客户可以访问，注册新的公司，新地点人员无权。

    children: [
      {
        path: '',
        loadChildren: 'app/components/profile/create-company-entry/create-company/create-company.module#CreateCompanyModule'
      },
      {
        path: 'wait-check-company',
        loadChildren: 'app/components/profile/create-company-entry/wait-check-company/wait-check-company.module#WaitCheckCompanyModule'
      },
      {
        path: 'check-company-edit',
        loadChildren: 'app/components/profile/create-company-entry/check-company-edit/check-company-edit.module#CheckCompanyEditModule'
      }
    ]

  }

];



@NgModule({
  imports:[RouterModule.forChild(createCompanyEntryRoutes)],
  exports:[RouterModule]
})

export class CreateCompanyEntryRoutingModule{}
