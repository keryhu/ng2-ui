/**
 * @Description : please enter the description
 * @date : 16/8/26 下午9:39
 * @author : keryHu keryhu@hotmail.com
 */



import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';


import {RequestService,Constant} from "../../../core";


@Injectable()
export class NewPasswordService{

  constructor(private http: Http, private request: RequestService){}


  isAccountAndTokenMatch(account:string,token:string){
    const url=Constant.recoverAccountAndTokenMatchUrl;
    const params = new URLSearchParams();
    params.set('account', account);
    params.set('token', token);
    return this.http.get(url, {search: params})
      .map((res: Response)=> {
        return res.json();
      })
      .catch(this.handleError);
  }


  submit(data){
    const url=Constant.recoverNewPassword;

    return this.http.post(url,JSON.stringify(data),
      {headers: this.request.getJsonHeaders()})
      .map(res=>{
        return res.json()
      })
      .catch(this.request.defaultHandlerError);


  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
