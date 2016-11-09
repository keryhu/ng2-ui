import {ReComponent} from "./re.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
/**
 * @Description : please enter the description
 * @date : 2016/11/7 上午9:25
 * @author : keryHu keryhu@hotmail.com
 */


const reRoutes: Routes = [
  {
    path: '',
    component: ReComponent,

  }
];

@NgModule({
  imports:[RouterModule.forChild(reRoutes)],
  exports:[RouterModule]
})
export class ReRoutingModule{}
