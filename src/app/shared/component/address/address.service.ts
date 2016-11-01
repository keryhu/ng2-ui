import {Injectable} from "@angular/core";
import {URLSearchParams, Http, Response} from "@angular/http";


import {RequestService,Constant} from "../../../core";



@Injectable()
export class AddressService {

  constructor(private http: Http, private request: RequestService) {

  }

  // 获取服务的  省份，直辖市的 数组
  getProvinces() {

    const url = Constant.getProvincesUrl;
    return this.http.get(url, this.request.getAuthOptions())
      .map((res: Response)=> {
        return res.json()
      })
      .catch(this.request.defaultHandlerError);

  }

  // 根据省份，获取地级市的数据
  getCities(code:string) {
    const url = Constant.getCitiesUrl;
    let params:URLSearchParams = new URLSearchParams();
    params.set('code',code);

    return this.http.get(url, this.request.getAuthOptions(params))
      .map((res: Response)=> {
        return res.json()
      })
      .catch(this.request.defaultHandlerError);

  }

  //根据省份，地级市，获取所有县的数据
  getCounties(code:string) {
    const url = Constant.getCountiesUrl;
    let params:URLSearchParams = new URLSearchParams();
    params.set('code',code);

    return this.http.get(url, this.request.getAuthOptions(params))
      .map((res: Response)=> {
        return res.json()
      })
      .catch(this.request.defaultHandlerError);
  }

}
