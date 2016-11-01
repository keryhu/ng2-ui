/**
 * @Description : please enter the description
 * @date : 2016/10/13 下午8:03
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response} from "@angular/http";


import {Constant,RequestService} from "../../../core";




@Injectable()
export class PersonalSetService{

  constructor(private http: Http, private request: RequestService) {

  }

  // get user 的个人资料
  getInfo(id:string){
    const url = Constant.getPersonalEditInfoUrl;
    const params = new URLSearchParams();
    params.set('id', id);

    return this.http.get(url, this.request.getAuthOptions(params))
      .map((res: Response)=> {
        return res.json();
      })
      .catch(this.request.defaultHandlerError);

  }


}
