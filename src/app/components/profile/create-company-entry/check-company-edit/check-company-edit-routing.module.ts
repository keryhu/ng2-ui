
/**
 * @Description : please enter the description
 * @date : 2016/11/4 上午9:52
 * @author : keryHu keryhu@hotmail.com
 */

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CheckCompanyEditComponent} from "./check-company-edit.component";
import {CheckCompanyEditResolve} from "./check-company-edit-resolve.service";


const checkCompanyEditRoutes: Routes = [
  {
    path: '',
    component: CheckCompanyEditComponent,
    resolve: {
      checkCompanyEditResolve: CheckCompanyEditResolve
    }

  }
];

@NgModule({
  imports:[RouterModule.forChild(checkCompanyEditRoutes)],
  exports:[RouterModule]
})
export class CheckCompanyEditRoutingModule{}
