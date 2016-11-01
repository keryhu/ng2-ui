import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, URLSearchParams} from "@angular/http";
import {Location} from "@angular/common";
import {Sort} from "../../sort";
import {AuthService,RequestService,Convert,Constant} from "../../../../../../core";

import {ServiceSearchContent} from "../../service-search.interface";
import {MdDialogConfig} from "@angular/material";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-company-detailed',
  templateUrl: './search-company-detailed.component.html',
  styleUrls: ['./search-company-detailed.component.css']
})


export class SearchCompanyDetailedComponent implements OnInit,OnDestroy {

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
  private sub:Subscription;



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

  // 由search-input，调用搜索服务，搜索公司，，
  startSearch() {
    this.setUrl();

    //this.refreshUsers(true);
   // this.currentPage=1;
   // this.refreshUrl();

    console.log('start search')
    console.log(this.searchParams);

  }


  pageChange(event) {
    //用户选择的是第几页。



  }

  // 调用远程的方法，刷新公司资料
  refreshCompany(isClickStart?:boolean){
    const p = new URLSearchParams();
    this.setSearchParam(p);

  }



  setSearchParam(p:URLSearchParams){
    if(this.authService.isXdidianAdmin()){
      if(this.searchParams.registerTimeBegin&&this.searchParams.registerTimeEnd){
        p.set('registerTimeBegin',this.searchParams.registerTimeBegin);
        p.set('registerTimeEnd',this.searchParams.registerTimeEnd);
      }
      if(this.searchParams.lastLoginTimeBegin&&this.searchParams.lastLoginTimeEnd){
        p.set('lastLoginTimeBegin',this.searchParams.lastLoginTimeBegin);
        p.set('lastLoginTimeEnd',this.searchParams.lastLoginTimeEnd);
      }
    }
    // admin 和 客服都需要的
    if(this.searchParams.content){
      console.log(this.searchParams);
      p.set('content',this.searchParams.content)
    }

    p.set('page', (this.currentPage-1).toString());
    p.set('size',this.pageSize.toString());
    if(this.searchParams.sort){
      this.searchParams.sort.forEach(
        e=>p.append('sort',e.toString())
      )
    }
  }


  ngOnDestroy(): void {
    if(typeof this.sub!='undefined'){
      this.sub.unsubscribe();
    }
  }

}
