
/**
 * @Description : please enter the description
 * @date : 2016/9/27 下午8:18
 * @author : keryHu keryhu@hotmail.com
 */


import {Http, Response} from "@angular/http";

import {Injectable} from "@angular/core";
import {RequestService,Constant} from "../../../../core";


@Injectable()

export class WaitCheckCompanyService{


  constructor(private http: Http, private request: RequestService) {
  }


  getNewCompanyInfo(){

    const url = Constant.getUnCheckdCompanyUrl;

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
