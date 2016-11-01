import {Component, OnInit, OnDestroy} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

import {SpinnerService, TokenService, TokenObj, Convert} from "../../../core";
// 下面的url 不要删除
import {ServiceSearchContent} from "../../../shared/component/account/search/service-search.interface";


@Component({
  selector: 'app-service-home',
  templateUrl: './service-home.component.html',
  styleUrls: ['./service-home.component.css']
})
export class ServiceHomeComponent implements OnInit,OnDestroy {

  private name: string;
  private searchContent: string;

  private urlParamObject: ServiceSearchContent = {};


  constructor(private titileService: Title, private spinner: SpinnerService,
              private tokenService: TokenService, private location: Location,
              private convert: Convert, private route: ActivatedRoute) {
  }


  //获取目前一共注册的在线会员 一共多少，注册公司一共多少。
  ngOnInit(): void {
    this.spinner.stop();
    this.name = this.tokenService.loginName();
    this.setTitle();
    this.setName();
    this.getParams();

  }

  // 将url 的 query param 转为object ，再通过@Input 传递给 child component
  getParams() {
    if (this.route.snapshot.queryParams) {

      // 如果 注册时间或者  结束时间，存在，url param 的形式，是
      //  spring 形式，然后 '，' 后隔开，需要将它转为 Array<number>

      // 将 url param 的值，复制到   urlParamObject 上。
      this.urlParamObject = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));

    }

  }

  public setTitle() {
    this.titileService.setTitle('新地点客服系统首页');
  }

  // 开始搜索内容。
  search(value) {
    this.searchContent = value;

  }


  //设置用户的name
  public setName(): void {
    const m: TokenObj = JSON.parse(localStorage.getItem('token'));
    if (m.name) {
      this.name = m.name;
    }

  }

  changeUrlParam(event) {
    if (event) {
      const index = 'service/home';
      this.location.replaceState(index, this.convert.serializeToQueryParam(event));

    }

  }

  ngOnDestroy(): void {

  }

}
