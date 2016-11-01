import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {Location} from "@angular/common";
import {Sort} from "../../sort";
import {AuthService,RequestService,Convert} from "../../../../../../core";

import {ServiceSearchContent} from "../../service-search.interface";
import {Constant} from "../../../../../../core/service/util/constant";

@Component({
  selector: 'app-search-company-detailed',
  templateUrl: './search-company-detailed.component.html',
  styleUrls: ['./search-company-detailed.component.css']
})


export class SearchCompanyDetailedComponent implements OnInit {

  private url:string;
  private indexUrl:string='service/home';
  private currentPage:number;

  // 搜索的公司数据
  private company:any;

// 是否加载  动态条。
  private isLoading:boolean=true;

  public totalItems:number;   // 总共的数据条目
  private pageSize=15; // 每一页的 包含的条目


  private registerTimeSort=new Sort('registerTime','none');



  constructor(private route: ActivatedRoute,private http: Http,
              private request: RequestService,
              private location: Location, private convert: Convert,
              private authService: AuthService) {
  }

  // 前台传递过来的 内容。
  @Input() searchParams: ServiceSearchContent;

  ngOnInit() {



  }



  //根据 role ，重新安排  url
  setUrl():void{
    if (this.authService.isXdidianAdmin()) {
      this.url = Constant.adminQueryCompanyWithPages;
    }
    else {
      this.url = Constant.serviceQueryCompanyWithPages;
    }
  }


  pageChange(event) {
    //用户选择的是第几页。



  }
}
