/**
 * @Description : please enter the description
 * @date : 2016/10/1 下午3:32
 * @author : keryHu keryhu@hotmail.com
 */

import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";


import {SpinnerComponent} from "./spinner.component";
import {SpinnerGuard} from "./spinner.guard";



@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerComponent],
  providers: [SpinnerGuard],
  exports: [SpinnerComponent]
})


export class SpinnerModule{}
