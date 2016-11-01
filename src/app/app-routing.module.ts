import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {HomeComponent} from "./components";
import {NotFoundComponent} from "./shared";
import {SpinnerGuard} from "./core";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [SpinnerGuard],
  },
  {
    path: 'login',
    loadChildren: 'app/components/login/login.module#LoginModule'
  },
  {
    path: 'signup',
    loadChildren: 'app/components/signup/signup.module#SignupModule'
  },
  {
    path: 'profile',
    loadChildren: 'app/components/profile/profile.module#ProfileModule'
  },
  {
    path: 'recover',
    loadChildren: 'app/components/recover/recover.module#RecoverModule'
  },
  {
    path: 'service',
    loadChildren: 'app/components/service/service.module#ServiceModule'
  },
  {
    path: 'email-activate',
    loadChildren: 'app/components/email-activate/email-activate.module#EmailActivateModule'
  },
  {
    path: 'access-denied',
    loadChildren: 'app/shared/component/pages/access-denied/access-denied.module#AccessDeniedModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Ng2UiRoutingModule { }
