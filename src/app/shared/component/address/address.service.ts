import {Injectable} from "@angular/core";
import {URLSearchParams, Http, Response} from "@angular/http";


import {RequestService, Constant} from "../../../core";
import {Observable} from "rxjs";
import {AddressItem} from "./address.component";


@Injectable()
export class AddressService {

  constructor(private http: Http, private request: RequestService) {

  }

  // 获取服务的  省份，直辖市的 数组（这里是code和name的object
  getProvinces(): Observable<Array<AddressItem>> {

    const url = Constant.getProvincesUrl;
    return this.http.get(url, this.request.getAuthOptions())
      .map((res: Response)=>res.json());

  }

  // 根据省份，获取地级市的数据，根据province name获取
  getCities(province: Observable<AddressItem>): Observable<Array<AddressItem>> {
    const url = Constant.getCitiesUrl;
    let params: URLSearchParams = new URLSearchParams();

    return province.switchMap(e=> {
      params.set('code', e.code);
      return this.http.get(url, this.request.getAuthOptions(params))
        .map((res: Response)=> {
          return res.json()
        })
        .catch(this.request.defaultHandlerError);
    });


  }

  //根据省份，地级市，获取所有县的数据
  getCounties(city: Observable<AddressItem>): Observable<Array<AddressItem>> {
    const url = Constant.getCountiesUrl;
    let params: URLSearchParams = new URLSearchParams();

    return city.switchMap(e=> {
      params.set('code', e.code);
      return this.http.get(url, this.request.getAuthOptions(params))
        .map((res: Response)=> {
          return res.json()
        })
        .catch(this.request.defaultHandlerError);
    });

  }


  getProvinceByProvinceName(name: string): Observable<AddressItem> {
    return this.getProvinces()
      .map(e=>e.filter(v=>v['name'] === name)[0]);
  }

  getCityByCityNameAndProvince(province: Observable<AddressItem>,
                               name:string): Observable<AddressItem>{
    return this.getCities(province)
      .map(e=>e.filter(v=>v['name'] === name)[0]);
  }

  //getCountyByCountyNameAnd

}
