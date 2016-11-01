
/**
 * @Description : 当加载   创建公司帐户路由的时候，首先加载所有的 省份，直辖市的  数据
 * @date : 16/9/21 下午4:28
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, Router} from "@angular/router";

import {Observable} from "rxjs";
import {CreateCompanyService} from "./create-company.service";
import {SpinnerService} from "../../../../core";


/**
 * 当打开  新建 公司帐户 页面的时候，，首先需要 加载 3个信息数据
 * 1  所有的 省市，直辖市的 数据
 * 2  所有的公司行业数据
 * 3  所有的公司性质数据
 * @return
 */


@Injectable()
export class CreateCompanyResolve implements Resolve<Observable<any>> {
  constructor(private createCompanyService:CreateCompanyService,
              private router: Router,private spinner: SpinnerService) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {

    return this.createCompanyService.getResolveInfo()
      .do(e=>{
        if(e['newCompanyErrMsg'].indexOf('已经提交过')!=-1){
          this.router.navigate(['/profile/create-company/wait-check']);
          // 这里必需要设置，这个stop，要不然，页面会一直显示 spinner
          this.spinner.stop();
        }
      })

  }
}
