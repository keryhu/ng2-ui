/**
 * @Description : 自创建的，用户省市县 的 地址 注册选择器
 * @date : 16/9/15 下午4:49
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit, OnDestroy,Input} from "@angular/core";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

import {AddressService} from "./address.service";
import {FormGroup, FormControl} from "@angular/forms";


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit,OnDestroy {

  private form: FormGroup;
  private province = new FormControl('', []);    // 省，直辖市
  private city = new FormControl('', []);         //  地级市
  private county = new FormControl('', []);    //   县

  private selectedProvinceCode: string;   //当前 被 选择的省份的  code 号码
  private defaultProvince: string = '上海市';

  private cities: Observable<Array<string>>;      // 显示在前台的  地级市
  private counties: Observable<Array<string>>;    //  显示在前台的  县

  private provinces: Array<string>;
  private provincesContainsCode: Array<Object>;

  constructor(private addressService: AddressService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      province: this.province,
      city: this.city,
      county: this.county
    });


    this.provincesContainsCode = this.route.snapshot.data[this.urlResolveName]['provinces'];

    this.provinces = this.provincesContainsCode.map(e=>e['name']);

    //初始化页面，将默认、省份的code取出来
    this.selectedProvinceCode = this.getSelectedProvinceCode(this.defaultProvince);

    // 设置默认的省份,地级市，县
    this.province.patchValue(this.defaultProvince);

    // 初始化，获取所有的地级市名单。（根据选择的 省份名字）

    this.cities = this.getCities();

    // 初始化页面的时候，初始化 县
    this.counties = this.getCountiesByDefaultCity();

  }

  //需要使用 comopany 组件的 前台 路由 resolve 的名字，例如createCompany  routing resolve
  // 传递过来的名字。如果前台直接传递 boject，那么就不需要这个名字了。
  @Input() urlResolveName: string;


  onProvinceChange(value: string) {

    this.selectedProvinceCode = this.getSelectedProvinceCode(value);
    this.cities = this.getCities();
    this.counties = this.getCountiesByDefaultCity();

  }

  // 通过，选择的 province name，返回此name 的code
  getSelectedProvinceCode(name: string): string {

    return this.provincesContainsCode
      .filter(e=>e['name'] === name)[0]['code'];

  }

  onCityChange(value: string) {

    console.log(value);
    this.counties = this.getCountiesBySelectedCity(value);
    //这个必需
    this.city.patchValue(value);
  }


  //查询地级市

  private getCities(): Observable<Array<string>> {
    return this.addressService.getCities(this.selectedProvinceCode)
      .map(e=> {
        const m: Array<string> = [];
        e.forEach(w=> {
          m.push(w['name']);
        });
        //下面这个必需
        this.city.patchValue(m[0]);
        return m;
      });
  }

  // 通过客户选择  的city，来 获取县的名单，这个使用在，用在 选择 地级市后，刷新 县的名单
  private getCountiesBySelectedCity(cityName: string): Observable<Array<string>> {

    return this.getSelectedCityCode(cityName)
      .switchMap(e=>this.addressService.getCounties(e))
      .map(e=> {
        const m: Array<string> = [];
        e.forEach(w=> m.push(w['name']));
        //下面这个必需
        this.county.patchValue(m[0]);
        return m;
      });

  }

  //通过city name  返回 city 的code 的 Observable<string>
  private getSelectedCityCode(name: string): Observable<string> {
    return this.addressService.getCities(this.selectedProvinceCode)
      .map(e=>e.filter(w=>w['name'] === name)[0]['code']);

  }

  // 通过默认的 city（也就是第一个city，来获取 县的名单，使用在  页面初始化和更新省份名单的时候）
  private getCountiesByDefaultCity(): Observable<Array<string>> {
    return this.addressService.getCities(this.selectedProvinceCode)
      .switchMap(e=>this.addressService.getCounties(e[0]['code']))
      .map(e=> {
        const m: Array<string> = [];
        e.forEach(w=> m.push(w['name']));
        //下面这个必需
        this.county.patchValue(m[0]);
        return m;
      });
  }


  getData(): Object {
    const data = this.form.value;

    return {
      province: data.province,
      city: data.city,
      county: data.county
    };

  }


  ngOnDestroy(): void {

  }

}
