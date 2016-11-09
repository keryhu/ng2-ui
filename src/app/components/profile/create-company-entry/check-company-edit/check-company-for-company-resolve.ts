
/**
 * @Description : 此resoleve 是为了获取  已经提交过的申请材料
 * @date : 2016/11/8 下午4:54
 * @author : keryHu keryhu@hotmail.com
 */
import {Injectable} from "@angular/core";

import {SpinnerService} from "../../../../core";
import {Observable} from "rxjs";
import {Router, ActivatedRouteSnapshot, Resolve} from "@angular/router";


import {CheckCompanyEditService} from "./check-company-edit.service";


// 和上面那个类似，但是这个是申请人在材料被拒绝后，的rest
// 而且这里还实现了，，申请人 注册后，资料被驳回，再次查看申请材料的rest，这个可以查看reject

@Injectable()
export class CheckCompanyForCompanyResolve implements Resolve<Observable<any>> {


  constructor(private checkCompanyEditService:CheckCompanyEditService,
              private router: Router,private spinner: SpinnerService) {
  }


  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {

    return this.checkCompanyEditService.getCompanyInfoAfterReject()
      .do(e=>{
        if(typeof e=='undefined'){
          this.router.navigate(['/profile/create-company']);
          this.spinner.stop();
        }
      });
  }
}
