/**
 * @Description : please enter the description
 * @date : 16/9/6 上午9:29
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {Http} from "@angular/http";



import {RequestService,Constant} from "../../../../core";




/**
 * @Description : 注册的service
 * @date : 16/7/17 上午7:53
 * @author : keryHu keryhu@hotmail.com
 */

@Injectable()
export class NeedPasswordService {


  constructor(private http:Http, private request:RequestService) {
  }

  //当前台更新用户资料的时候,需要用户验证密码的时候,提供给后台的服务,需要传递过来的参数有: url 和 data
  validatePasswordAndSaveInfo(data) {
    let url='';
    //如果更改的是 姓名。那么就对应姓名的url
    if(data.hasOwnProperty('name')){
      url=Constant.validateNameCanModifyOrSaveUrl;
    }
    else if(data.hasOwnProperty('birthday')){
      url=Constant.editBirthdayUrl;
    }
    else if(data.hasOwnProperty('account')){
      url=Constant.accountEditUrl;
    }

    return this.http.post(url, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=>res.json())
      .catch(this.request.defaultHandlerError);
  }
}
