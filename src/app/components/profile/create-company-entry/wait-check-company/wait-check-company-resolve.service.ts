/**
 * @Description : please enter the description
 * @date : 2016/9/27 下午9:01
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, Router} from "@angular/router";

import {Observable} from "rxjs";
import {WaitCheckCompanyService} from "./wait-check-company.service";
import {SpinnerService} from "../../../../core";


@Injectable()
export class WaitCheckCompanyResolve implements Resolve<Observable<any>> {


  constructor(private waitCheckCompanyService:WaitCheckCompanyService,
              private router: Router,private spinner: SpinnerService) {
  }


  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {

    return this.waitCheckCompanyService.getNewCompanyInfo()
      .do(e=>{
        if(typeof e=='undefined'){
          this.router.navigate(['/profile/create-company']);
          this.spinner.stop();
        }
      });
  }
}
