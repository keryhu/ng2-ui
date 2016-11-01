/**
 * @Description : x新地点的工作人员，查看目前有没有 需要被审核的公司。
 * @date : 2016/10/10 下午1:05
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable}   from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

import {CheckCompanyService} from "./check-company.service";


@Injectable()
export class CheckCompanyResolve implements Resolve<Observable<any>> {

  constructor(private checkCompanyService:CheckCompanyService){

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {

    return this.checkCompanyService.getUncheckedCompany();
  }

}
