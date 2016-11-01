/**
 * @Description : please enter the description
 * @date : 2016/10/14 下午1:41
 * @author : keryHu keryhu@hotmail.com
 */


import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {SpinnerGuard} from "../../../../core/";


import {CreateCompanyComponent} from "./create-company.component";
import {CreateCompanyResolve} from "./create-company-resolve.service";


const createCompanyRoutes: Routes = [
  {
    path: '',
    component: CreateCompanyComponent,
    canActivate: [SpinnerGuard],
    resolve: {
      checkCompanyResolve: CreateCompanyResolve
    }



  }

];



@NgModule({
  imports:[RouterModule.forChild(createCompanyRoutes)],
  exports:[RouterModule]
})

export class CreateCompanyRoutingModule{}
