


/**
 * @Description : 整个系统的 唯一的 singleTon module
 * @date : 16/9/3 下午4:09
 * @author : keryHu keryhu@hotmail.com
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";


import {SpinnerModule,SpinnerService,TopNavbarModule,
} from "./component";
import {RequestService, AccessTokenRest, TokenService, AuthProviders,
  UserQueryService,Convert,StringFormat,CountdownService,
} from "./service";
import {FocusDirective} from "./directive";









   //SpinnerModule NavbarComponent 必需 在 coreModule,SideMenuModule 不能放在 此module

@NgModule({
  imports: [ CommonModule,HttpModule,RouterModule,SpinnerModule,TopNavbarModule],

  declarations:[ FocusDirective],

  //sideMenuComponent,不能放在 此处
  providers: [Title,SpinnerService,RequestService,AccessTokenRest,TokenService,AuthProviders,
  UserQueryService,Convert,StringFormat,CountdownService],

  exports: [ CommonModule,HttpModule,RouterModule,SpinnerModule,
    FocusDirective,TopNavbarModule]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() private parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only!')
    }
  }
}
