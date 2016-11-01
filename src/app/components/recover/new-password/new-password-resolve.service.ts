/**
 * @Description : please enter the description
 * @date : 16/8/26 下午8:48
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable}   from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, Resolve, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {StringFormat} from "../../../core/service/validate/string-format";
import {NewPasswordService} from "./new-password.service";


@Injectable()

export class NewPasswordResolve implements Resolve<any> {

  constructor(private router: Router, private route: ActivatedRoute,
              private newPasswordService: NewPasswordService, private stringFormat: StringFormat) {
  }


  resolve(route: ActivatedRouteSnapshot): Observable<any>|any {
    const account: string = route.queryParams['account'];
    const token: string = route.queryParams['token'];

    // 如果account,不存在于数据库, 或者token 与账号不匹配,直接 返回login页面
    if (!account || !token) {

      this.router.navigate(['/login']);
      return false;
    } else {

      return this.newPasswordService.isAccountAndTokenMatch(account, token)
        .subscribe(
          e=> {
            console.log(e);
            if (e && e.result===false) {
              this.router.navigate(['/login']);
              return false;
            }
            else{
              return true;
            }
          }
        )
    }


  }
}
