/**
 * @Description : 用在  注册完,email激活的时候,需要调用的 后台验证
 * 这个是email,phone 激活验证
 * @date : 16/7/20 下午12:10
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";


import {RequestService,Constant} from "../../../../core";



@Injectable()
export class AccountActivateService {


  constructor(private http:Http, private request:RequestService) {
  }

//type参数包含了confirmCode,resend,resignup 3种  ,另外applySituation,代表的是3种使用 情况
   // signup,edit或recover
  click(data:Object,type:string,applySituation:string){

    const url:string=`${Constant.accountActivateClickUrl}${type}`;
    let headers=applySituation=='EDIT'?this.request.getAuthHeaders():this.request.getJsonHeaders();
    return this.http.post(url, JSON.stringify(data),
      {headers: headers})
      .map((res:Response)=>res.json())
      .catch(this.request.defaultHandlerError)
  }





}
