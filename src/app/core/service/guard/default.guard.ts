/**
 * @Description :  默认的员工的权限,包含无业人员和在公司属于最底层,没有下属的人员。
 * 物业公司  权限  拥有 [role.ROLE_DEFAULT,role.ROLE_COMPANY_ADMIN,role.ROLE_SOME_DEPARTMENT,
 role.ROLE_XDIDIAN_ADMIN,role.ROLE_XDIDIAN_SERVICE];,任何一个权限的,都可以访问此路由
 * @date : 16/7/10 上午11:54
 * @author : keryHu keryhu@hotmail.com
 */


import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';


import {AuthService,RoleEnum} from "../auth";


@Injectable()
export class DefaultGuard implements CanActivate {


  constructor( private auth:AuthService, private router:Router) {

  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    const roles=[RoleEnum.ROLE_DEFAULT,RoleEnum.ROLE_COMPANY_ADMIN,
      RoleEnum.ROLE_SOME_DEPARTMENT,
      RoleEnum.ROLE_XDIDIAN_ADMIN,RoleEnum.ROLE_XDIDIAN_SERVICE];

    if (this.auth.hasAnyRole(roles)) {
      return true;
    }
    this.router.navigate(['access-denied']);
    return false;

  }

}
