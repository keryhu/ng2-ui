/**
 * @Description : please enter the description
 * @date : 16/8/24 下午1:30
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";


import {RequestService,Constant} from "../../../core";


@Injectable()
export class CheckMethodService{

  constructor(private http: Http, private request: RequestService){}

  private url=Constant.recoverCheckMethodUrl;


    submit(data){
      return this.http.post(this.url,JSON.stringify(data),
        {headers: this.request.getJsonHeaders()})
        .map(res=>res.json());
    }

}
