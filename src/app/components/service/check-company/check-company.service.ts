/**
 * @Description : please enter the description
 * @date : 2016/10/9 下午2:56
 * @author : keryHu keryhu@hotmail.com
 */




import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";


import {RequestService,Constant} from "../../../core";


@Injectable()
export class CheckCompanyService {


  constructor(private http: Http, private request: RequestService) {
  }

  //客服人员或新地点的管理员，获取当前数据库中未审核，且reject未null的所有的
  getUncheckedCompany(){
    const url=Constant.serviceCheckCompanyResolveUrl
    return this.http.get(url, this.request.getAuthOptions())
      .map(res=>res.json());

  }

}
