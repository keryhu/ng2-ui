/**
 * @Description : please enter the description
 * @date : 2016/11/3 下午7:30
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {RequestService,Constant} from "../../../../core";


@Injectable()
export class CheckCompanyDetailService{

  constructor(private http: Http, private request: RequestService) {
  }


  // 当工作人员审核完材料后，提交给后台的post
  postCheckCompanyRest(data){
    const url = Constant.serviceCheckCompanyUrl;
    return this.http.post(url, JSON.stringify(data),
      {headers: this.request.getJsonHeaders()})
      .map(res=>res.json());
  }
}
