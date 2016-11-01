/**
 * @Description : please enter the description
 * @date : 2016/9/29 下午8:06
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RequestService,Constant} from "../../../core";


@Injectable()
export class AddServiceService {

  private url = Constant.adminAddServiceUrl

  constructor(private http:Http, private request:RequestService) {
  }

  //注册具体实现方法
  create(data) {
    return this.http.post(this.url, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=>res.json());
  }


}
