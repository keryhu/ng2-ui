/**
 * @Description : 如果需要客户登录的路有,但是客户没有登录,就自动跳转到 login页面
 * @date : 16/7/10 上午11:24
 * @author : keryHu keryhu@hotmail.com
 */
import {
  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild,
  Route
} from '@angular/router';

import {Injectable} from '@angular/core';


import {AuthService} from "../auth";


@Injectable()
export class AuthenticatedGuard implements CanActivate,CanActivateChild {


  constructor( private auth:AuthService, private router:Router) {

  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }


  checkLogin(url: string): boolean {
  const token: string = localStorage.getItem('access-token');
    if(token){
      if (this.auth.isLoggedIn) { return true; }
    }
    else{
      // Store the attempted URL for redirecting
      this.auth.redirectUrl = url;

      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }



  }
}
