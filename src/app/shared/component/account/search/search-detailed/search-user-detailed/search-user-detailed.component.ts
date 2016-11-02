import {Component, OnInit, Input, ViewContainerRef, OnDestroy} from '@angular/core';
import {Location} from "@angular/common";
import {Http, URLSearchParams} from "@angular/http";
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";

import {RequestService, AuthService, Convert, Constant} from "../../../../../../core";

import {ServiceSearchContent} from "../../service-search.interface";
import {Sort} from "../../sort";

import {ServiceUserDialog} from "../../../../dialog";
import {Subscription} from "rxjs";


export interface ConnectParam {
  isClickStart?: boolean;    // 如果为true，表示是 用户点击  搜索按钮促发的搜索，而不是刷新浏览器
  init?: boolean;           // 是否是 浏览器刷新进入的，如果为true表示是
}

@Component({
  selector: 'app-search-user-detailed',
  templateUrl: './search-user-detailed.component.html',
  styleUrls: ['./search-user-detailed.component.css']
})
export class SearchUserDetailedComponent implements OnInit,OnDestroy {


  private url: string;
  private indexUrl: string = 'service/home';
  private currentPage: number;
  private user: any;
  // 是否加载  动态条。
  private isLoading: boolean = true;

  public totalItems: number;   // 总共的数据条目
  private pageSize = 15; // 每一页的 包含的条目


  private lastLoginTimeSort = new Sort('lastLoginTime', 'none');
  private nameSort = new Sort('name', 'none');
  private sub: Subscription;

  // dialog
  dialogRef: MdDialogRef<ServiceUserDialog>;


  constructor(private http: Http, private request: RequestService,
              private location: Location, private convert: Convert,
              private authService: AuthService, public dialog: MdDialog,
              public viewContainerRef: ViewContainerRef) {
  }


  ngOnInit() {

    this.setUrl();
    // 从servicehome 中，获取到设置的 page 参数，如果存在的情况下，他是通过 *@Input 传递过来的
    if (this.searchParams && this.searchParams.page) {

      this.currentPage = +this.searchParams.page;

      console.log(this.searchParams);

      // 如果url里面含有 sort，需要手动刷新sort icon 图标
      if ( typeof this.searchParams.sort === 'string') {
        const w = Sort.parse(this.searchParams.sort);  //w is array of Sort
        console.log(w);

        //const m:Sort=Sort.parse(this.searchParams.sort);
        w.forEach(e=> {
          switch (e.property) {
            case 'lastLoginTime':
              this.lastLoginTimeSort = e;
              break;
            case 'name':
              this.nameSort = e;
              break;
            default:
              console.log(e);
          }
        });


        // 因为 this.searchParams.sort is string ，所以删除，然后重新改为array
        delete this.searchParams.sort;

        this.searchParams.sort = [];
        this.searchParams.sort = w.slice();   // copy w to  sort
        console.log(this.searchParams);
        const m: ConnectParam = {
          init: true
        };
        this.refreshUsers(m);
      }

      else {
        const m: ConnectParam = {
          isClickStart:true
        };
        this.refreshUsers(m);
      }
    }
    else {
      this.currentPage = 1;
      this.isLoading = false;
    }


  }


  // 前台传递过来的 内容。
  @Input() searchParams: ServiceSearchContent;


  //根据 role ，重新安排  url
  setUrl(): void {
    if (this.authService.isXdidianAdmin()) {
      this.url = Constant.adminQueryUserWithPage;
    }
    else {
      this.url = Constant.serviceQueryUserWithPage;
    }
  }


  clickUser(email: string) {
    console.log(email);
  }

  // 开始调用后台服务器，搜索。
  startSearch() {
    this.setUrl();
    const m: ConnectParam = {
      isClickStart:true
    };
    this.refreshUsers(m);
    this.currentPage = 1;
    this.refreshUrl();

  }

  pageChange(event) {
    //用户选择的是第几页。
    this.currentPage = event.page;
    const m: ConnectParam = {
      isClickStart:false
    };
    this.refreshUsers(m);
    this.refreshUrl();
  }

  refreshUrl() {
    this.searchParams.page = this.currentPage;
    this.location.replaceState(this.indexUrl,
      this.convert.serializeToQueryParam(this.searchParams));
  }


  // 当用户，切换sort icon 促发的事件。 传递来的是 sort对象，包含属性property: string;
  // "id"   属性 名字
  //direction: SortDirection; ---"DESC"  排序的方向  支持多列排序


  toggleSortName(event: Sort) {
    if (event) {
      if (event.direction === 'none') {
        // 删除掉，该属性对应的 sort
        if (this.searchParams && this.searchParams.sort) {

          // 将sort 中如果含有此排序的 属性名字 过滤掉。
          this.searchParams.sort = this.searchParams.sort
            .filter(e=>e.property !== event.property);
        }

      }
      else if (event.direction === 'asc' || event.direction === 'desc') {

        if (this.searchParams.sort) {
          //  如果sort存在，则查看对应的属性名字存在不存在，
          //  如果存在 ， 覆盖原来的值
          const exist = this.searchParams.sort
            .some(e=>e.property === event.property);
          if (exist) {
            this.searchParams.sort = this.searchParams.sort
              .filter(e=>e.property !== event.property);
          }
        }
        else {
          //这是sort对象完全不存在，所以新建
          this.searchParams.sort = [];
        }

        //  增加新的sort。
        this.searchParams.sort.push(event);
        console.log(this.searchParams.sort);

      }

      const m: ConnectParam = {
        init: false
      };
      this.refreshUsers(m);
      this.refreshUrl();
    }


  }



  // 点击 排序，或浏览器  刷新促发的事件  参数boolean，如果为true，代表是从 页面，因为含有sort，
  // 引起的 排序，否则是用户点击'排序'产生的排序
  refreshUsers(cp: ConnectParam) {
    const p = new URLSearchParams();
    this.setSearchParam(p);

    if (cp.init == false) {
      this.currentPage = 1;
    }

    this.sub=this.http.get(this.url, this.request.getAuthOptions(p))
      .map(res=>res.json())
      .subscribe(
        e=> {
          if (e) {
            this.isLoading = false;
            this.user = e['content'];

            if (typeof cp.isClickStart == 'undefined' || cp.isClickStart == true) {
              this.totalItems = e['totalElements'];
            }

            if (Array.isArray(e['content']) && e['content'].length == 0) {
              this.totalItems = 0;
            }
          }

        },
        err=> {
          this.isLoading = false;
        }
      );
  }

  // 当服务器调取后台data的时候，设置url参数。
  setSearchParam(p: URLSearchParams) {
    if (this.authService.isXdidianAdmin()) {
      if (this.searchParams.registerTimeBegin && this.searchParams.registerTimeEnd) {
        p.set('registerTimeBegin', this.searchParams.registerTimeBegin);
        p.set('registerTimeEnd', this.searchParams.registerTimeEnd);
      }
      if (this.searchParams.lastLoginTimeBegin && this.searchParams.lastLoginTimeEnd) {
        p.set('lastLoginTimeBegin', this.searchParams.lastLoginTimeBegin);
        p.set('lastLoginTimeEnd', this.searchParams.lastLoginTimeEnd);
      }

    }

    // admin 和 客服都需要的
    if (this.searchParams.content) {
      console.log(this.searchParams);
      p.set('content', this.searchParams.content)
    }

    p.set('page', (this.currentPage - 1).toString());
    p.set('size', this.pageSize.toString());
    if (this.searchParams.sort) {
      this.searchParams.sort.forEach(
        e=>p.append('sort', e.toString())
      )
    }
  }


  //dialog,目前测试，等 material2
  openDialog() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ServiceUserDialog, config);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }


  ngOnDestroy(): void {
    if (typeof this.sub != 'undefined') {
      this.sub.unsubscribe();
    }
  }

}
