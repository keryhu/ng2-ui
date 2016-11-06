/**
 * @Description : please enter the description
 * @date : 2016/11/3 下午2:40
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {Resolve, Router, ActivatedRouteSnapshot} from "@angular/router";

import {Observable} from "rxjs";
import {Http, URLSearchParams} from "@angular/http";

import {Constant,RequestService} from "../../../../core";



@Injectable()
export class CheckCompanyDetailResolveService implements Resolve<Observable<any>>{

  constructor(private router: Router,private http: Http,
              private request: RequestService) {
  }


  // 为什么这里的http get 后台数据，不放在另外的 service里面，因为这里需要获取
  //  companyId 不存在的情况，好让url转到404去。
  resolve(route: ActivatedRouteSnapshot): Observable<any>|any{

    let id = route.params['id'];
    const url = Constant.serviceQueryNewCompanyInfoByCompanyIdUrl;
    const params = new URLSearchParams();
    params.set('companyId', id);

    return this.http.get(url, this.request.getAuthOptions(params))
      .map(res=>{
        if(res['_body']==''){
          this.router.navigate(['/404']);
          return false;
        }
        else {
          return res.json();
        }
      })
      .catch(this.request.defaultHandlerError);

  }

}
