
/**
 * @Description : 只有 客户才能访问的guard ，例如创建 公司帐户，个人设置等。url
 * @date : 2016/9/29 下午3:35
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";


import {RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate} from "@angular/router";



import {RoleEnum,AuthService} from "../auth";


@Injectable()
export class OnlyCustomerGuard implements CanActivate {


  constructor( private auth:AuthService, private router:Router) {

  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    const roles=[RoleEnum.ROLE_DEFAULT,
    RoleEnum.ROLE_SOME_DEPARTMENT];

    if (this.auth.hasAnyRole(roles)) {
      return true;
    }
    this.router.navigate(['access-denied']);
    return false;

  }

}
