/**
 * @Description : please enter the description
 * @date : 2016/9/29 上午9:23
 * @author : keryHu keryhu@hotmail.com
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {ServiceComponent} from "./service.component";
import {AuthenticatedGuard,XdidianServiceGuard} from "../../core";

const serviceRoutes: Routes = [
  {
    path: '',
    component: ServiceComponent,
    canActivate: [AuthenticatedGuard,XdidianServiceGuard],
    children: [
      {
        path: 'home',
        loadChildren: 'app/components/service/service-home/service-home.module#ServiceHomeModule'
      },
      //加入客服 和 编辑客服，只能 新地点的管理人员才能进入。已经将权限计入到了各自的routing 文件中。
      //  已经验证过了，加入客服 和 编辑客服 后台 url 以admin开头，只能新地点客服人员才能访问。

      {
        path:'del-service',
        loadChildren: 'app/components/service/del-service/del-service.module#DelServiceModule'
      },
      {
        path:'add-service',
        loadChildren: 'app/components/service/add-service/add-service.module#AddServiceModule'
      },
      {
        path:'check-company',
        loadChildren: 'app/components/service/check-company/check-company.module#CheckCompanyModule'
      },
      {
        path:'recharge',
        loadChildren: 'app/components/service/recharge/recharge.module#RechargeModule'
      }

    ]
  }
];



@NgModule({
  imports:[RouterModule.forChild(serviceRoutes)],
  exports:[RouterModule]
})
export class ServiceRoutingModule{}
