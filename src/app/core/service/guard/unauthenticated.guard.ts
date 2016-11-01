/**
 * @Description : 如果用户已经登录了,在浏览器里面输入 login 路由的话,自动跳转 个人用户首页
 * @date : 16/7/10 上午11:24
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";


import {RoleEnum,AuthService} from "../auth";


@Injectable()
export class UnauthenticatedGuard implements CanActivate{

  constructor(private authService:AuthService,private router:Router){}

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if(!this.authService.isLoggedIn()){
      return true;
    }
    const roles=[RoleEnum.ROLE_XDIDIAN_ADMIN,RoleEnum.ROLE_XDIDIAN_SERVICE];

    if(this.authService.hasAnyRole(roles)){
      this.router.navigate(['service/home'])
    }
    else{
      this.router.navigate(['/profile/home']);
    }
    return false;
  }

}
