
/**
 * @Description : please enter the description
 * @date : 2016/10/25 上午9:11
 * @author : keryHu keryhu@hotmail.com
 */


import {DateParsePipe} from "./date-parse.pipe";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";



@NgModule({
  imports: [CommonModule,],
  declarations: [DateParsePipe],
  exports: [DateParsePipe]
})
export class DateParseModule { }
