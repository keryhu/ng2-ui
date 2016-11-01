/**
 * @Description : please enter the description
 * @date : 16/8/19 下午7:59
 * @author : keryHu keryhu@hotmail.com
 */


import {Http, Response, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';


import {RequestService} from "../auth";
import {Constant} from "../util";

@Injectable()
export class UserQueryService {

  constructor(private http: Http,private request: RequestService) {
  }


  emailExist(email: string): Observable<boolean> {
    const url = Constant.emailExistQueryUrl
    const params = new URLSearchParams();
    params.set('email', email);

    return this.http.get(url, {search: params})
      .map((res: Response)=> {
        return res.json();
      })
      .catch(this.handleError);

  }

  phoneExist(phone: string): Observable<boolean> {
    const url = Constant.phoneExistQueryUrl;
    const params = new URLSearchParams();
    params.set('phone', phone);

    return this.http.get(url, {search: params})
      .map((res: Response)=> {
        return res.json();
      })
      .catch(this.handleError);

  }

  // 查看账号(email或者phone是否存在于数据库。
  accountExist(account: string): Observable<boolean> {

    const url = Constant.accountExistQueryUrl;
    const params = new URLSearchParams();
    params.set('loginName', account);

    return this.http.get(url, {search: params})
      .map((res: Response)=> {
        return res.json();
      })
      .catch(this.handleError);
  }

  //需要登录用户才能查询  需要reuest
  companyNameExist(name: string): Observable<boolean> {

    const url = Constant.companyNameExistQueryUrl;
    const params = new URLSearchParams();
    params.set('name', name);

    return this.http.get(url, this.request.getAuthOptions(params))
      .map((res: Response)=> {
        return res.json();
      })
      .catch(this.handleError);
  }


  //查询email所在的状态有没有激活,如果已经激活,直接跳转login页面。
  emailStatus(id: string): Observable<boolean> {
    const url = Constant.emailStatusQueryUrl;
    const params = new URLSearchParams();
    params.set('loginName', id);

    return this.http.get(url, {search: params})
      .map((res: Response)=> {
        return res.json();
      })
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }

}
