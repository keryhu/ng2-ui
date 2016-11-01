/**
 * @Description :  在一家公司,如果拥有某个或某些部门,整个权限的guard
 * @date : 16/7/10 上午11:54
 * @author : keryHu keryhu@hotmail.com
 */


import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';


import {RoleEnum,AuthService} from "../auth";


@Injectable()
export class SomeDepartmentGuard implements CanActivate {


  constructor( private auth:AuthService, private router:Router) {

  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    const roles=[RoleEnum.ROLE_COMPANY_ADMIN,RoleEnum.ROLE_SOME_DEPARTMENT,
      RoleEnum.ROLE_XDIDIAN_ADMIN,RoleEnum.ROLE_XDIDIAN_SERVICE];

    if (this.auth.hasAnyRole(roles)) {
      return true;
    }
    this.router.navigate(['access-denied']);
    return false;

  }

}
