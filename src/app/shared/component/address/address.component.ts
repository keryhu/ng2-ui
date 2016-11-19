/**
 * @Description : 自创建的，用户省市县 的 地址 注册选择器
 * @date : 16/9/15 下午4:49
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {AddressService} from "./address.service";

// 建立一个地址信息的基本单位，由 code 和name组成。
export interface AddressItem {
  name: string;
  code: string;

}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit,OnDestroy {

  private defaultProvince: string = '上海市';

  private provinces: Observable<Array<AddressItem>>;
  private cities: Observable<Array<AddressItem>>;      // 显示在前台的  地级市
  private counties: Observable<Array<AddressItem>>;    //  显示在前台的  县

  private selectedProvince: Observable<AddressItem>;
  private selectedCity: Observable<AddressItem>;
  private selectedCounty: Observable<AddressItem>;
  private sub:Subscription;



  constructor(private addressService: AddressService) {
  }


  ngOnInit(): void {

    // 获取远程的省份，给前台。
    this.provinces = this.addressService.getProvinces();

    this.selectedProvince=this.addressService
      .getProvinceByProvinceName(this.defaultProvince);

    this.cities = this.addressService
      .getCities(this.selectedProvince);

    this.selectedCity=this.cities.map(e=>e[0]);

    this.counties=this.addressService
      .getCounties(this.selectedCity);

    this.selectedCounty=this.counties.map(e=>e[0]);

  }


  // Province 更改促发的事件
  onProvinceChange(value: string) {
    console.log(value);

    this.selectedProvince=this.addressService
      .getProvinceByProvinceName(value);

    this.cities = this.addressService
      .getCities(this.selectedProvince);

    this.selectedCity=this.cities.map(e=>e[0]);

    this.counties=this.addressService
      .getCounties(this.selectedCity);

    this.selectedCounty=this.counties.map(e=>e[0]);
  }

  // city 更改促发的事件
  onCityChange(value: string) {

    this.selectedCity=this.addressService
      .getCityByCityNameAndProvince(this.selectedProvince,value);

    this.counties=this.addressService
      .getCounties(this.selectedCity);

    this.selectedCounty=this.counties.map(e=>e[0]);
  }

  onCountyChange(value:string){
     this.selectedCounty=Observable.of({
       //这里的code，后续不需要再次被调用，所以现在随便些写一个，只要name能够获取即可
       name:value,code:'0000'
     })
  }

  // 获取用户取得的最新的 地址数据，方便前台获取，注意这个返回的结果是一个object
  // 分别为【省份，地级市，县】
  getAddressArray():Observable<string>{
    return Observable.combineLatest(
      this.selectedProvince.map(e=>e.name),
      this.selectedCity.map(e=>e.name),
      this.selectedCounty.map(e=>e.name)
    )
      .map(e=>`${e[0]},${e[1]},${e[2]}`);
  }

  ngOnDestroy(): void {
    if(typeof this.sub!='undefined'){
      this.sub.unsubscribe();
    }
  }


}
