/**
 * @Description : please enter the description
 * @date : 16/8/22 下午4:06
 * @author : keryHu keryhu@hotmail.com
 */
import {NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";

import {SharedModule} from "../../shared";
import {PhoneExist,EmailExist} from "../../core";

import {SignupComponent} from "./signup.component";
import {SignupService} from "./signup.service";
import {SignupRoutingModule} from "./signup-route.module";








@NgModule({
  imports: [SharedModule,SignupRoutingModule,MaterialModule.forRoot()],
  declarations: [SignupComponent],
  providers: [SignupService,EmailExist,PhoneExist]
})

export  class SignupModule {
}





