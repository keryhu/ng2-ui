
/**
 * @Description : // 和上面那个类似，但是这个是申请人在材料被拒绝后，的rest
 // 而且这里还实现了，，申请人 注册后，资料被驳回，再次查看申请材料的rest，这个可以查看reject
 * @date : 2016/9/27 下午8:18
 * @author : keryHu keryhu@hotmail.com
 */


import {Http, Response} from "@angular/http";

import {Injectable} from "@angular/core";
import {RequestService,Constant} from "../../../../core";


@Injectable()

export class CheckCompanyEditService{


  constructor(private http: Http, private request: RequestService) {
  }


  getCompanyInfoAfterReject(){

    const url = Constant.getUnCheckdCompanyAfterRejectUrl;

    return this.http.get(url, this.request.getAuthOptions())
      .map((res: Response)=> {
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
