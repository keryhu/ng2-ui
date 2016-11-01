/**
 * @Description : 当 显示login页面的时候,需要提前resolve ipblock 是否拥堵的信息。
 * @date : 16/8/22 上午11:36
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable}   from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";


import {IpBlockStatus} from "./ip-block.service";


@Injectable()
export class IpBlockResolve implements Resolve<Observable<any>> {

  constructor(private ipBlockStauts:IpBlockStatus){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {

    return this.ipBlockStauts.query();
  }

}
