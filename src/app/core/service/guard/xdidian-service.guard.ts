/**
 * @Description : 拥有新地点客服权限的guard,新地点的客服,和管理员 的人员才能访问此页面
 * @date : 16/7/10 上午11:24
 * @author : keryHu keryhu@hotmail.com
 */


import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';


import {RoleEnum,AuthService} from "../auth";


@Injectable()
export class XdidianServiceGuard implements CanActivate {


  constructor( private auth:AuthService, private router:Router) {

  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    const roles=[RoleEnum.ROLE_XDIDIAN_ADMIN,RoleEnum.ROLE_XDIDIAN_SERVICE];

    if (this.auth.hasAnyRole(roles)) {
      return true;
    }
    this.router.navigate(['access-denied']);
    return false;

  }

}
