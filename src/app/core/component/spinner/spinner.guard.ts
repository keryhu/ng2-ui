/**
 * @Description : please enter the description
 * @date : 2016/10/1 下午6:11
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {SpinnerService} from "./spinner.service";


@Injectable()
export class SpinnerGuard implements CanActivate {


  constructor(private spinnerService:SpinnerService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.spinnerService.start();
    return true;
  }

}
