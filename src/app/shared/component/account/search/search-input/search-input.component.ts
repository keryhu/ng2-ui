import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import * as moment from 'moment';
import {AuthService,Constant} from "../../../../../core";

import {allSearchType} from "../search.interface";
import {ServiceSearchContent} from "../service-search.interface";
import {Sort} from "../sort";

// 当搜索的时候，需要用table显示结果，table 的 titile由哪些参数组成，就是这个
export interface dataTitle{
  name:string;     // title name
  cName:string;     // table title name 中文名字
  sort:boolean;    // 是否需要sort
  sortIcon?:Sort;    //显示sort对象
}


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {


  private isXdidianAdmin: boolean = this.authService.isXdidianAdmin();
  private selectedTimeErrMsg: string;

  private showRegisterDatePicker: boolean = false;
  private showLastLoggedDatePicker: boolean = false;
  private placeholdContent: string;
  // input search content
  private searchContent: string;

  // 用户选择搜索类型，是user还是company，和url 参数保持一致
  private selectedtSearchType: string;
  // 传递给前台
  private allSearchTypes = allSearchType;
  // 传递给 search-page 的 主url，以后url刷新就是靠这个
  private indexUrl="/service/home";
  private searchUserServerUrl:string;

  // 传递给user  search page 的 table title
  private userTableTitle:Array<dataTitle>=[
    {name: 'name',cName:'姓名' ,sort: true,sortIcon: new Sort('name','none')},
    {name:'email',cName:'邮箱' , sort:false},
    {name:'lastLoginTime',cName:'上次登陆时间' ,sort:true,
      sortIcon: new Sort('lastLoginTime','none')}
  ];


  // 用户提供的搜索条件
  private submitedObject: ServiceSearchContent = {};

  private today:string;  // 新的注册时间，开始时间，传给dateComponent使用的


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getParam();
    // 设置当前事件为今天，当新开一个 注册事件的时候，这个设置给前台为默认结束时间为今天
    this.today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    // 根据role权限不同，设置不同的url，搜索user
    this.seUserServertUrl();
  }


  @Output() changeUrlParam = new EventEmitter<Object>();
  // 前台通过获取url 参数，获取到 的 用户 设置的搜索条件的参数，，用来让之用户刷新页面的时候，参数消失
  @Input() urlParamObject: ServiceSearchContent = {};

  //get param ,从前台传递来的object ，来放置 用户刷新页面的时候，参数丢失，所以现在重设置
  getParam() {

    if (this.urlParamObject) {
      // 将 url param 的值，复制到   submitObject 上。
      this.submitedObject = JSON.parse(JSON.stringify(this.urlParamObject));
      if (this.urlParamObject.searchType) {
        if (this.urlParamObject.searchType !== allSearchType[0]) {
          this.selectedtSearchType = this.urlParamObject.searchType;

          if (this.urlParamObject.searchType === allSearchType[2]) {
            this.placeholdContent = '输入email/手机号/姓名，查询会员...';
          }
          else {
            this.placeholdContent = '输入公司名字，查询...';
          }
        }
      }

      // input content
      this.searchContent = this.urlParamObject.content;
      // 如果注册时间和结束时间 不为null，那么就打开此 checkbox
      if (this.urlParamObject.registerTimeBegin
        && this.urlParamObject.registerTimeEnd) {
        this.showRegisterDatePicker = true;
      }
      if (this.urlParamObject.lastLoginTimeBegin
        && this.urlParamObject.lastLoginTimeEnd) {
        this.showLastLoggedDatePicker = true;
      }

    }

  }

  //根据 role ，重新安排  url
  seUserServertUrl(): void {
    if (this.isXdidianAdmin) {
      this.searchUserServerUrl = Constant.adminQueryUserWithPage;
    }
    else {
      this.searchUserServerUrl = Constant.serviceQueryUserWithPage;
    }
  }




  // 当切换不同的  SearchType  ，需要情况，submitedObject，最后再补上当前的submitedObject，
  //同时也清空了 url中 query param

  toggleSearchType(value) {

    if (value === allSearchType[1]) {
      this.placeholdContent = '输入公司名字，查询...';
      this.showLastLoggedDatePicker = false;
      this.removeLoginDate();
      this.removeRegisterDate();

    }
    if (value === allSearchType[2]) {
      this.placeholdContent = '输入email/手机号/姓名，查询会员...';
    }
    if (value === allSearchType[0]) {
      this.searchContent = undefined;
      this.submitedObject = {};
    }

    this.submitedObject['searchType'] = value;
    this.changeUrlParam.emit(this.submitedObject);

  }

  // 下面 需要。
  removeRegisterDate(): void {
    delete this.submitedObject.registerTimeBegin;
    delete this.submitedObject.registerTimeEnd;
  }

// 下面 需要。
  removeLoginDate() {
    delete this.submitedObject.lastLoginTimeBegin;
    delete this.submitedObject.lastLoginTimeEnd;
  }


  // 当date component 事件更改，促发的事件，这里要搜集这个新的事件，然后更新到 submitObject上去
  //  还有更新到 url中去。第一个参数是 属性的名字，第二个是传递的新的日期时间的string格式
  changeDate(property:string,value:string){
    this.submitedObject[property]=value;
    this.changeUrlParam.emit(this.submitedObject);
  }

}


