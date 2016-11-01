

/**
 * @Description : 注册的service
 * @date : 16/7/17 上午7:53
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {RequestService,Constant} from "../../core";

@Injectable()
export class SignupService {

  private url = Constant.signupUrl;

  constructor(private http:Http, private request:RequestService) {
  }

  //注册具体实现方法
  create(data) {
    return this.http.post(this.url, JSON.stringify(data),
      {headers: this.request.getJsonHeaders()})
      .map(res=>res.json());
  }
}
