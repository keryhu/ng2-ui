
/**
 * @Description : please enter the description
 * @date : 2016/10/14 上午11:51
 * @author : keryHu keryhu@hotmail.com
 */

import {NgModule} from "@angular/core/src/metadata/ng_module";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {TextEditComponent} from "./text-edit.component";


@NgModule({
  imports: [CommonModule,MaterialModule.forRoot()],
  declarations: [TextEditComponent],
  exports: [TextEditComponent]
})


export class TextEditModule{}
