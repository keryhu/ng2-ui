
/**
 * @Description : 当加载   创建公司帐户路由的时候，首先加载所有的 省份，直辖市的  数据
 * @date : 16/9/21 下午4:28
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, Router} from "@angular/router";

import {Observable} from "rxjs";
import {SpinnerService} from "../../../../core";
import {CheckCompanyTemplateService} from "../../../../shared";


/**
 * 当打开  新建 公司帐户 页面的时候，，首先需要 加载 3个信息数据
 * 1  所有的 省市，直辖市的 数据
 * 2  所有的公司行业数据
 * 3  所有的公司性质数据
 * @return
 */


@Injectable()
export class CheckCompanyEditResolve implements Resolve<Observable<any>> {
  constructor(private checkCompanyTemplateService:CheckCompanyTemplateService,
              private router: Router,private spinner: SpinnerService) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {

    return this.checkCompanyTemplateService.getCheckCompanyCommonInfo();
  }
}
