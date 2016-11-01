/**
 * @Description : 当转到email激活的页面的时候,首先需要判断下,改email有没有被激活,如果已经激活了,直接跳转
 * login页面,这个在路由的resolve 里面判断。,如果email 不存在,则跳转  signup页面
 * @date : 16/8/23 下午1:46
 * @author : keryHu keryhu@hotmail.com
 */
import {Injectable}   from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Router,Resolve,ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";


import {UserQueryService,StringValidate} from "../../core";



@Injectable()

export class EmailStatusResolve implements Resolve<any>{

  constructor(private router: Router,private route: ActivatedRoute,
              private userQuery: UserQueryService){}

  resolve(route: ActivatedRouteSnapshot): Observable<any>|any{
    const email:string=route.queryParams['email'];

    if(email&&StringValidate.email(email)){

      return this.userQuery.emailStatus(email).subscribe(
        e=> {
          if (e) {
            this.router.navigate(['login']);
            return false;
          }
        }
      )
    }

    // 如果参数中email不存在,则直接返回signup
    else{
      this.router.navigate(['/signup']);
      return false;
    }

  }

}
