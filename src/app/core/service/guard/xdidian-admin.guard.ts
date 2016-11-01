/**
 * @Description : 新地点公司的管理员  拥有 ['ROLE_TENANT','ROLE_SERVICE','ROLE_ADMIN'] 任何一种role的人才能访问此页面
 * @date : 16/7/10 下午1:38
 * @author : keryHu keryhu@hotmail.com
 */


import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';


import {RoleEnum,AuthService} from "../auth";


@Injectable()
export class XdidianAdminGuard implements CanActivate {


  constructor( private auth:AuthService, private router:Router) {

  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {


    if (this.auth.hasRole(RoleEnum.ROLE_XDIDIAN_ADMIN)) {
      return true;
    }
    this.router.navigate(['access-denied']);
    return false;

  }

}
