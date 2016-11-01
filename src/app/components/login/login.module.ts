/**
 * @Description : please enter the description
 * @date : 16/8/18 下午9:51
 * @author : keryHu keryhu@hotmail.com
 */

import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {MaterialModule} from "@angular/material";



import {LoginRoutingModule} from "./login-routing.module";

import {SharedModule} from "../../shared";
import {IpBlockResolve} from "./ip-block-resolve.service";
import {IpBlockStatus} from "./ip-block.service";





@NgModule({
  imports: [SharedModule,LoginRoutingModule,MaterialModule.forRoot()],
  declarations: [LoginComponent],
  providers: [IpBlockStatus,IpBlockResolve]
})

export class LoginModule{

}
