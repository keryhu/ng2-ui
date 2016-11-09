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




  // 将 审核的结果，提交给后台
  submitCheckCompany(data){
    const url=Constant.serviceCheckCompanyPostUrl;

    return this.http.post(url, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=>res.json())
      .map(e=>{
        if(e.status==500){
          const m=JSON.parse(e['_body']);

           console.log(m)
        }
        return e;
      });


  }



}
