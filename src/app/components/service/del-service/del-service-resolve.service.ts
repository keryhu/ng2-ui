
/**
 * @Description : please enter the description
 * @date : 2016/9/30 下午5:09
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {DelServiceService} from "./del-service.service";


@Injectable()
export class DelServiceResolve implements Resolve<Observable<any>> {

  constructor(private delServiceService:DelServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {

    return this.delServiceService.query();


  }
}
