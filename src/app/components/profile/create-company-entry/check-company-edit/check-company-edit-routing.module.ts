
/**
 * @Description : please enter the description
 * @date : 2016/11/4 上午9:52
 * @author : keryHu keryhu@hotmail.com
 */

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CheckCompanyEditComponent} from "./check-company-edit.component";
import {CheckCompanyForNameResolve} from "./check-company-for-name-resolve.service";
import {CheckCompanyForCompanyResolve} from "./check-company-for-company-resolve";


const checkCompanyEditRoutes: Routes = [
  {
    path: '',
    component: CheckCompanyEditComponent,
    resolve: {
      checkCompanyForNameResolve: CheckCompanyForNameResolve,
      checkCompanyForCompanyResolve:CheckCompanyForCompanyResolve
    }

  }
];

@NgModule({
  imports:[RouterModule.forChild(checkCompanyEditRoutes)],
  exports:[RouterModule]
})
export class CheckCompanyEditRoutingModule{}
