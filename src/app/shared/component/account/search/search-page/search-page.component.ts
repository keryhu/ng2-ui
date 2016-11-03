import {Component, OnInit, Input, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Location} from "@angular/common";
import {URLSearchParams, Http} from "@angular/http";
import {Subscription} from "rxjs";
import * as moment from 'moment';
import {StringValidate, Convert,RequestService,AuthService} from "../../../../../core";
import {ServiceSearchContent} from "../service-search.interface";

import {Sort} from "../sort";
import {dataTitle} from "../search.interface";



export interface ConnectParam {
  isClickStart?: boolean;    // 如果为true，表示是 用户点击  搜索按钮促发的搜索，而不是刷新浏览器
  init?: boolean;           // 是否是 浏览器刷新进入的，如果为true表示是
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit,OnDestroy {


  private isXdidianAdmin: boolean = this.authService.isXdidianAdmin();
  // input 中双向绑定的 searchcontent
  private searchContent: string;
  // input 框是否是否含有特殊字符
  private containsSpecialCharacter: boolean = false;
// 是否加载  动态条。
  private isLoading: boolean = true;
  private sub: Subscription;
  //从后台取得的数据，page数据
  private data: any;
  // 日期选择错误，就显示错误信息
  private selectedTimeErrMsg: string;

  // 如果设置了搜索时间，这个就是检测设置的是否正确，默认是正确的，如果不正确是不搜索后台的。
  private timeCorrect:boolean=true;

  // 当前的页码
  private currentPage: number;
  private pageSize = 15; // 每一页的 包含的条目
  public totalItems: number;   // 总共的数据条目


  constructor(private location: Location, private convert: Convert,
              private http: Http, private request: RequestService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getInitParam();

  }

  //是否显示input search输入框
  @Input() showSearchInput = new EventEmitter<boolean>();
  // 显示在 input 里面的 placeholder
  @Input() placeholder = new EventEmitter<boolean>();

  // 前台传递过来的 内容。就是搜索的 条件
  @Input() searchParams: ServiceSearchContent;
  // 前台传递过来的 主url，以后刷新url就是在此基础上
  @Input() indexUrl: string;
  // 搜索后台服务器的url
  @Input()  serverUrl:string;

  // 前台传递来的 data table 的 title，包含了是否由sort
  @Input()  dataTitle:Array<dataTitle>;

  // 点击某一行，是否显示 dialog
  @Input() showDialog:boolean;

  // 当某一行的checkbox 被选择，发送该id给前台。
 // @Output() selectId = new EventEmitter<string>();



  // 从url中获取想要的参数，使得浏览器刷新的时候，不影响
  getInitParam(){
    if(this.searchParams ){
      // 设置page参数
      if(this.searchParams.page){
        this.currentPage = +this.searchParams.page;
        console.log(this.searchParams);

        // 如果url里面含有 sort，需要手动刷新sort icon 图标
        if ( typeof this.searchParams.sort === 'string') {
          const w = Sort.parse(this.searchParams.sort);  //w is array of Sort

          // 将浏览器里面的sort参数，转到dataTitle里面去
          const t=this.dataTitle
            .map(e=>{
              w.forEach(i=>{
                if(i.property===e.name&&e.sort==true){
                  e.sortIcon=JSON.parse(JSON.stringify(i));
                }
              });
              return e;
            });
          this.dataTitle=t.slice();
          // 因为 this.searchParams.sort is string ，所以删除，然后重新改为array
          delete this.searchParams.sort;

          this.searchParams.sort = [];
          this.searchParams.sort = w.slice();   // copy w to  sort
          console.log(this.searchParams);
          this.checkTimeConfig();
          if(this.timeCorrect){
            const m: ConnectParam = {init: true};
            this.refreshDatas(m);
          }
        }

        else {
          this.checkTimeConfig();
          if(this.timeCorrect){
            const m: ConnectParam = {isClickStart:true};
            this.refreshDatas(m);
          }
        }
      }
      else {
        this.currentPage = 1;
        this.isLoading=false;
      }
      if(this.searchParams.content){
        this.searchContent=this.searchParams.content
      }
      else {
        this.searchContent=undefined;
      }
    }
    else {
      this.isLoading = false;
    }
  }

  // enter 或点击 search开始搜索的方法
  search() {
    this.testSpecialCharacter();

    this.checkTimeConfig();

    if(this.timeCorrect){
      const m: ConnectParam = {
        isClickStart:true
      };
      this.refreshUrl();
      this.refreshDatas(m);
      this.currentPage = 1;
    }
  }

  // 检测时间设置 的对不对。
  checkTimeConfig(){
    let registTimeCorrect=true;
    let lastLoginTimeCorrect=true;
    if(this.searchParams.registerTimeBegin&&this.searchParams.registerTimeEnd){
      registTimeCorrect = this.validateSelectedDate(
        this.searchParams['registerTimeBegin'],
        this.searchParams['registerTimeEnd']);

    }
    if(this.searchParams.lastLoginTimeBegin&&this.searchParams.lastLoginTimeEnd){
      lastLoginTimeCorrect = this.validateSelectedDate(
        this.searchParams['lastLoginTimeBegin'],
        this.searchParams['lastLoginTimeEnd']);
    }
    this.timeCorrect=registTimeCorrect&&lastLoginTimeCorrect;
    if(!this.timeCorrect){
      this.isLoading=false;
    }

  }

  // 检测input中是否含有非法字符
  testSpecialCharacter() {
    if (this.searchContent) {
      this.containsSpecialCharacter = StringValidate.specialCharacter(this.searchContent);
      // 取出特殊字符
      if (this.containsSpecialCharacter) {
        const SC = /[`~!#\$%\^\&\*\+<>\?:"\{\},\\\/;'\[\]]/ig;
        const value = this.searchContent.replace(SC, '');
        this.searchParams['content'] = value;
      }
      else {
        this.searchParams['content'] = this.searchContent;
      }
    }
    else {
      delete this.searchParams.content;
    }
  }


  // 刷新url 的代码
  refreshUrl() {
    this.searchParams.page = this.currentPage;
    this.location.replaceState(this.indexUrl,
      this.convert.serializeToQueryParam(this.searchParams));
  }

  // 当服务器调取后台data的时候，设置url参数。  距离有哪些参数，都是由前台传递过来，
  // 后台不负责验证权限
  setSearchParam(p: URLSearchParams) {
    if (this.searchParams.registerTimeBegin && this.searchParams.registerTimeEnd) {
      p.set('registerTimeBegin', this.searchParams.registerTimeBegin);
      p.set('registerTimeEnd', this.searchParams.registerTimeEnd);
    }
    if (this.searchParams.lastLoginTimeBegin && this.searchParams.lastLoginTimeEnd) {
      p.set('lastLoginTimeBegin', this.searchParams.lastLoginTimeBegin);
      p.set('lastLoginTimeEnd', this.searchParams.lastLoginTimeEnd);
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

  // 点击 排序，或浏览器  刷新促发的事件  参数boolean，如果为true，代表是从 页面，因为含有sort，
  // 引起的 排序，否则是用户点击'排序'产生的排序
  refreshDatas(cp: ConnectParam) {
    const p = new URLSearchParams();
    this.setSearchParam(p);

    if (cp.init == false) {
      this.currentPage = 1;
    }

    this.sub = this.http.get(this.serverUrl, this.request.getAuthOptions(p))
      .map(res=>res.json())
      .subscribe(
        e=> {
          if (e) {
            this.isLoading = false;
            this.data = e['content'];

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


  // 更改页码促发的事件
  pageChange(event) {
    //用户选择的是第几页。
    this.currentPage = event.page;
    const m: ConnectParam = {
      isClickStart:false
    };
    this.refreshDatas(m);
    this.refreshUrl();
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
      this.refreshDatas(m);
      this.refreshUrl();
    }

  }

  // 验证所选的时间，是否正确。
  validateSelectedDate(startDate: string, endDate: string): boolean {
    if(endDate){
      if ((typeof startDate == 'undefined')) {
        this.selectedTimeErrMsg = '起始时间必需选择';
        return false;
      }
      const s = moment(startDate);
      const e = moment(endDate);
      if(moment.max(s,e)==s){
        this.selectedTimeErrMsg = '起始时间必需早于结束时间';
        return false;
      }
      return true;
    }
    else {
      if (startDate) {
        this.selectedTimeErrMsg = '结束时间必需选择';
        return false;
      }
      return true;
    }

  }

  clickdata(data){
    //显示data 的id
    console.log(data);
    if(this.showDialog==true){
      console.log('show dialog')
    }

  }

  ngOnDestroy(): void {
    if(typeof this.sub!=='undefined'){
      this.sub.unsubscribe();
    }
  }


}
