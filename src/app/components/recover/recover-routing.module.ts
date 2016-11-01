/**
 * @Description : please enter the description
 * @date : 16/8/23 下午7:19
 * @author : keryHu keryhu@hotmail.com
 */



import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";


import {RecoverComponent} from "./recover.component";



const recoverRoutes: Routes = [
  {
    path: '',
    component: RecoverComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/components/recover/input-account/input-account.module#InputAccountModule'
      },
      {
        path: 'method',
        loadChildren: 'app/components/recover/check-method/check-method.module#CheckMethodModule'
      },
      {
        path: 'check-code',
        loadChildren: 'app/components/recover/check-code/check-code.module#CheckCodeModule'
      },
      {
        path: 'new-password',
        loadChildren: 'app/components/recover/new-password/new-password.module#NewPasswordModule'
      }
    ]

  }

];




@NgModule({
  imports:[RouterModule.forChild(recoverRoutes)],
  exports:[RouterModule]
})
export class RecoverRoutingModule{}
