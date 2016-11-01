import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {InputAccountComponent} from "./input-account.component";
import {SpinnerGuard} from "../../../core";


const inputAccountRoutes: Routes=[
  {
    path: '',
    component: InputAccountComponent,
    canActivate:[SpinnerGuard]

  }
];

export const inputAccountRouting=RouterModule.forChild(inputAccountRoutes);


@NgModule({
  imports:[RouterModule.forChild(inputAccountRoutes)],
  exports:[RouterModule]
})
export class InputAccountRoutingModule{}
