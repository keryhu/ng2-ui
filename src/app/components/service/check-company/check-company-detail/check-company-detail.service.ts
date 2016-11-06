/**
 * @Description : please enter the description
 * @date : 2016/11/3 下午7:30
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {RequestService,Constant} from "../../../../core";


@Injectable()
export class CheckCompanyDetailService{

  constructor(private http: Http, private request: RequestService) {
  }


  // 当工作人员进入审核页面后，搜索所有未审核的注册公司，当点击某一个公司详情
  //的时候，通过companyId，来获取他的提交材料

  newCompanyInfoByCompanyIdUrl(data){
    const url = Constant.serviceQueryNewCompanyInfoByCompanyIdUrl;

    return this.http.get(url, this.request.getAuthOptions())
      .map((res: Response)=> {
        console.log(res);
        if(res['_body']==''){
          return undefined;
        }
        else {
          return res.json();
        }
      })
      .catch(this.request.defaultHandlerError);

  }



}
