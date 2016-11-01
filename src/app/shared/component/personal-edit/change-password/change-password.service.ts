/**
 * @Description : 专门服务于，更改密码的服务
 * @date : 16/9/14 下午8:22
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RequestService,Constant} from "../../../../core";


@Injectable()
export class ChangePasswordService{

  constructor(private http: Http, private request: RequestService) {

  }

  submit(data){
    const url=Constant.changePasswordUrl;

    return this.http.post(url, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=>{
        const j=res.json();
        console.log(j['name']);
      })
      .catch(this.request.defaultHandlerError);

  }
}
