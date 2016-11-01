/**
 * @Description : please enter the description
 * @date : 2016/9/30 下午4:04
 * @author : keryHu keryhu@hotmail.com
 */

import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";


import {RequestService,Constant} from "../../../core";

@Injectable()
export class DelServiceService {


  constructor(private http: Http, private request: RequestService) {
  }

  query(name?:string){
    const url = Constant.adminQueryServiceByName;

    let params = new URLSearchParams();

    if(typeof name!=='undefined'){
      params.set('name',name)
    }

    return this.http.get(url, this.request.getAuthOptions(params))
      .map(res=>res.json());
  }


  //注册具体实现方法
  del(ids?:Array<string>) {

    const url = Constant.adminDelServiceById;

    let params = new URLSearchParams();

    if(typeof ids!=='undefined'){
      ids.forEach(e=>params.append('ids',e));
    }

    return this.http.delete(url, this.request.getAuthOptions(params))
      .map(res=>res.json());
  }


}
