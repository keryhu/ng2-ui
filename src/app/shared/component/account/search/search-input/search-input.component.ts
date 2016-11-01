import {Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter, Input,
} from '@angular/core';
import * as moment from 'moment';
import {AuthService, StringValidate} from "../../../../../core";

import {allSearchType} from "../search.interface";


import {ServiceSearchContent} from "../service-search.interface";


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit,OnDestroy {


  private isXdidianAdmin: boolean = this.authService.isXdidianAdmin();
  private selectedTimeErrMsg: string;
  // 显示 最近登录的  多选框
  private showLastLoggedCheckBox: boolean = false;
  private showRegisterCheckBox: boolean = false;
  private showRegisterDatePicker: boolean = false;
  private showLastLoggedDatePicker: boolean = false;
  private placeholdContent: string;
  // input search content
  private searchContent: string;

  // 用户选择搜索类型，是user还是company，和url 参数保持一致
  private selectedtSearchType: string;
  // 传递给前台
  private allSearchTypes = allSearchType;


  private containsSpecialCharacter: boolean = false;

  // 用户提供的搜索条件
  private submitedObject: ServiceSearchContent = {};

  private today:string;  // 新的注册时间，开始时间，传给dateComponent使用的


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getParam();

    // 设置当前事件为今天，当新开一个 注册事件的时候，这个设置给前台为默认结束时间为今天
    this.today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  }


  // 获取 注册开始时间和结束时间
  @ViewChild('startRegisterDate') startRegisterDate: any;
  @ViewChild('endRegisterDate') endRegisterDate: any;

  // 获 用户最近一次登录
  @ViewChild('startLoggedDate') startLoggedDate: any;
  @ViewChild('endLoggedDate') endLoggedDate: any;


  //search result ...
  @ViewChild('userDetail') userDetail: any;

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
          this.showRegisterCheckBox = true;
          this.selectedtSearchType = this.urlParamObject.searchType;

          if (this.urlParamObject.searchType === allSearchType[2]) {
            this.showLastLoggedCheckBox = true;
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




  // 当切换不同的  SearchType  ，需要情况，submitedObject，最后再补上当前的submitedObject，
  //同时也清空了 url中 query param

  toggleSearchType(value) {

    if (value === allSearchType[1]) {
      this.placeholdContent = '输入公司名字，查询...';
      this.showRegisterCheckBox = true;
      this.showLastLoggedCheckBox = false;
      this.showLastLoggedDatePicker = false;
      this.removeLoginDate();

    }
    if (value === allSearchType[2]) {
      this.placeholdContent = '输入email/手机号/姓名，查询会员...';
      this.showRegisterCheckBox = true;
      this.showLastLoggedCheckBox = true;
    }
    if (value === allSearchType[0]) {
      this.showRegisterCheckBox = false;
      this.showLastLoggedCheckBox = false;
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

  //date param refresh  // 这个必需要，否则 search 的时候无法找到更新后的时间
  dateParamUrlRefresh() {

    // 勾选了 注册时间的 checkbox
    if (this.showRegisterDatePicker) {

      if (this.startRegisterDate && this.startRegisterDate.getDate()) {
        this.submitedObject['registerTimeBegin'] = this.startRegisterDate.getDate();
      }

      if (this.endRegisterDate && this.endRegisterDate.getDate()) {
        this.submitedObject['registerTimeEnd']  = this.endRegisterDate.getDate();
      }

    }
    else {
      this.removeRegisterDate();

    }

    // 登录时间处理
    if (this.showLastLoggedDatePicker) {
      // 勾选了 上次登陆时间的 checkbox
      if (this.startLoggedDate && this.startLoggedDate.getDate()) {
        this.submitedObject['lastLoginTimeBegin']= this.startLoggedDate.getDate();
      }
      if (this.endLoggedDate && this.endLoggedDate.getDate()) {
        this.submitedObject['lastLoginTimeEnd'] = this.endLoggedDate.getDate();
      }
    }

    else {
      this.removeLoginDate();

    }

  }


  // 因为现在 没有 日期更改的 change 事件，所以只有在 提交的时候，才更新日期
  search() {
    if (this.searchContent) {
      this.containsSpecialCharacter = StringValidate.specialCharacter(this.searchContent);
      // 取出特殊字符
      if (this.containsSpecialCharacter) {
        const SC = /[`~!#\$%\^\&\*\+<>\?:"\{\},\\\/;'\[\]]/ig;
        const value = this.searchContent.replace(SC, '');
        this.submitedObject['content'] = value;
      }
      else {
        this.submitedObject['content'] = this.searchContent;
      }
    }

    // 只有admin 才有时间的选择
    if (this.isXdidianAdmin) {
      // 这个必需要，否则 search 的时候无法找到更新后的时间
      this.dateParamUrlRefresh();

      const registTimeCorrect = this.validateSelectedDate(
        this.submitedObject['registerTimeBegin'],
        this.submitedObject['registerTimeEnd']);

      if (!registTimeCorrect) {
        this.removeRegisterDate();
      }

      const lastLoginTimeCorrect = this.validateSelectedDate(
        this.submitedObject['lastLoginTimeBegin'],
        this.submitedObject['lastLoginTimeEnd']);

      if (!lastLoginTimeCorrect) {
        this.removeLoginDate();
      }

      if (registTimeCorrect && lastLoginTimeCorrect) {
        this.selectedTimeErrMsg = undefined;
      }

      // 开始向后台搜索
      if (registTimeCorrect && lastLoginTimeCorrect) {
        this.queryService();
      }

    }

    else {
      //// 直接 inutcontent 向后台搜索，如果是 新地点的客服，则input输入框必需有value
      if (this.searchContent) {
        this.selectedTimeErrMsg = undefined;
        this.queryService();

      }
    }
    console.log(this.submitedObject);


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


  // 将用户输入内容，向后台http post 服务
  queryService() {

    this.changeUrlParam.emit(this.submitedObject);

    // do something   user
    if (this.submitedObject['searchType'] === allSearchType[2]) {
      // 促使searchUserDetailComponent 的方法，调用后台查询接口
      this.userDetail.startSearch();

    }
    // 公司
    else if (this.submitedObject['searchType'] === allSearchType[1]) {

    }

  }


  ngOnDestroy(): void {
  }


}


