import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {SpinnerService,Constant} from "../../../../core";
import {Sort,dataTitle} from "../../../../shared";
import {ServiceSearchContent} from "../../../../shared/component/account/search/service-search.interface";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-check-company-home',
  templateUrl: 'check-company-home.component.html',
  styleUrls: ['check-company-home.component.css']
})
export class CheckCompanyHomeComponent implements OnInit {

  //传递给  search-page 的 主url
  private indexUrl="/service/check-company";
  //传递给  后台查询为审核的公司的 url
  private searchCompanyServerUrl:string=Constant.serviceQueryUncheckdCompanyUrl;
  // input中的 placehold
  private placeholdContent: string='输入公司名字搜索...';

  private companyTableTitle:Array<dataTitle>=[
    {name:'name',cName:'公司名字',sort: true,sortIcon: new Sort('name','none')},
    {name:'registerTime',cName:'注册时间' ,sort:true,
      sortIcon: new Sort('registerTime','none')},
    {name:'checked',cName:'审核是否通过',sort:true,
      sortIcon: new Sort('checked','none')}
  ];

  // 用户提供的搜索条件,
  private submitedObject: ServiceSearchContent = {};



  constructor(private spinner: SpinnerService,private router: Router,
              private route: ActivatedRoute,private titileService: Title) { }

  ngOnInit() {
    this.spinner.stop();
    this.setTitle();
    this.getParams();
  }

  public setTitle() {
    this.titileService.setTitle('新地点客服系统-审核注册公司');
  }

  // 将url 的 query param 转为object ，再通过@Input 传递给 child component
  getParams() {
    if (this.route.snapshot.queryParams) {

      // 将 url param 的值，复制到   urlParamObject 上,然后传递给search-page component
      this.submitedObject= JSON.parse(JSON.stringify(this.route.snapshot.queryParams));

    }

  }


  getSelectId(data){
    this.router.navigate([data], { relativeTo: this.route });
  }
}
