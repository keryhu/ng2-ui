
/**
 * @Description : 个人资料修改的时候，如email，姓名，手机号，提交后台验证和保存的服务
 * @date : 2016/10/14 上午11:46
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RequestService,Constant} from "../../../../core";

@Injectable()
export class EditTextService{

  constructor(private http: Http, private request: RequestService) {

  }


  // 修改名字的时候,提交后台,查看是否可以修改名字。
  validateNameCanModifyOrSave(data){
    const url = Constant.validateNameCanModifyOrSaveUrl;
    return this.http.post(url, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=>res.json())
      .catch(this.request.defaultHandlerError);
  }

  // 修改email或phone的时候,提交后台,查看是否可以修改email。
  validateAccountCanModifyOrSave(data){
    const url = Constant.accountEditUrl;
    return this.http.post(url, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=>res.json())
      .catch(this.request.defaultHandlerError);
  }



}
