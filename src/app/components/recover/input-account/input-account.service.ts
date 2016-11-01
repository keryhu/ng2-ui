/**
 * @Description : 提交email或手机,返回email 和手机,2个账号
 * @date : 16/8/23 下午8:10
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {URLSearchParams, Http, Response} from "@angular/http";


import {RequestService,Constant} from "../../../core";

@Injectable()
export class InputAccountService{

  private url=Constant.recoverInputAccountUrl;

  constructor(private http: Http, private request: RequestService){}

  submit(data:string){
    const params = new URLSearchParams();
    params.set('account', data);

    return this.http.get(this.url,this.request.getJsonOptions(params))
      .map((res: Response)=> {
        return res.json()
      })
      .catch(this.request.defaultHandlerError);

  }

}
