import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";

import {TokenObj, TokenService, AuthService} from "../../../service";

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {TopMessageService} from "./top-message.service";
import {Subscription} from "rxjs";

// 这个是  顶部栏 显示 未读消息对象的 interface
// 最基本的subjectMsg
interface SubjectMsg {
  subject: string;
  count: number;
}
// websocket 传递过来的消息 interface
interface WebsocketMessage {
  subject: string;
  userId: string;
  readGroup: string;
  operate: string;
}

@Component({
  selector: 'app-top-message',
  templateUrl: 'top-message.component.html',
  styleUrls: ['top-message.component.css']
})
export class TopMessageComponent implements OnInit,OnDestroy {

  private userId: string;
  private accessToken:string;
  // 是否 是新地点的客服人员或者管理员
  private isXdidian: boolean = this.authService.isXdidianAdmin() ||
    this.authService.isXdidianService();
  private endpointUrl = '/websocket/front';
  private individulaSubUrl: string;
  private xdidianSubUrl = '/topic/websocketAndMessage';
  private stompClient: any;
  //private sendUrl = '/pcAngular2/hello'
  // 查看message是否为空，也就是说有没有未读消息，从前台传过来。
  private topMsgNotEmpty: boolean;

  private subjectMsgs: Array<SubjectMsg>;
  private initMsgSub: Subscription;
  private getInitMsgSub: Subscription;
  private updateMsgSub: Subscription;


  constructor(private authService: AuthService, private tokenService: TokenService,
              private router: Router, private topMessageService: TopMessageService) {}

  ngOnInit() {
    // 使用异步方法，促使 用户登录后，马上能够显示 未读消息
    this.initMsgSub = this.topMessageService.initMessageAfterLoginedIn()
      .subscribe(e=> {
        this.subjectMsgs = e.filter(v=>v['count']>0);
        this.topMsgNotEmpty = this.subjectMsgs.length > 0;
      });

    // 上面那个是 登录 促发的，下面这个是 刷新页面促发的
    if (this.authService.isLoggedIn()) {
      this.accessToken=localStorage.getItem('access-token');
      this.connect();

      this.getInitMsgSub = this.topMessageService.getInitMessages()
        .subscribe(e=> {
          this.subjectMsgs = e.filter(v=>v['count']>0);
          this.topMsgNotEmpty = this.subjectMsgs.length > 0;
        });

      const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
      this.userId = tokenObj.userId;

      this.individulaSubUrl = '/user/queue/websocketAndMessage';


    }

  }

  connect() {
    const socket = new SockJS(this.endpointUrl);
    this.stompClient = Stomp.over(socket);
    const headers = {};
    const token = this.tokenService.getCsrf();
    headers['X-CSRF-TOKEN'] = token;
    headers['X-Auth-Token']=this.accessToken;

    let stompConnect = (frame) => {

      console.log('Connected: ' + frame);
      this.stompClient.subscribe(this.individulaSubUrl, e=> {
        console.log(e.body);
        this.doWithWebsocket(e.body);
      },headers);
      if (this.isXdidian) {
        this.stompClient.subscribe(this.xdidianSubUrl, e=> {
          console.log(e.body);
          this.doWithWebsocket(e.body);
        },headers)
      }
    };
    this.stompClient.connect(headers, stompConnect);

  }


  //异步查看当前用户有没有登录
  getLoggedIn() {
    return this.authService.getLoggedIn();
  }

  // 用户点击 某一个message促发的事件
  clickMessage(message) {
    switch (message.subject) {
      case '待审核公司':
        this.router.navigate(['/service/check-company'],
          {queryParams: {page: 1}});
        console.log('待审核公司');
        this.updateMessage('待审核公司');
        break;
      case '公司注册成功':  //需要改
        this.router.navigate(['/service/check-company'],
          {queryParams: {page: 1}});
        console.log('公司注册成功');
        break;
      case '公司注册失败':
        this.router.navigate(['/profile/create-company/check-company-edit']);
        break;
      case '待加入员工':     //需要改
        this.router.navigate(['/service/check-company'],
          {queryParams: {page: 1}});
        break;
      case '申请加入公司成功':   //需要改
        this.router.navigate(['/service/check-company'],
          {queryParams: {page: 1}});
        break;
      case '申请加入公司失败':    //需要改
        this.router.navigate(['/service/check-company'],
          {queryParams: {page: 1}});
        break;
      default:
        break;

    }
  }

  // 当用户点击 菜单的时候，更新 未读消息。
  updateMessage(value: string) {
    this.updateMsgSub = this.topMessageService.updateMessage(value)
      .subscribe(
        e=> {
          if (e && e.result == true) {
            console.log('update success');
            this.subjectMsgs = this.subjectMsgs.filter(v=>v.subject != value);
            if (this.subjectMsgs.length == 0) {
              this.topMsgNotEmpty = false;
            }
          }
        },
        err=> {
          console.log(err);
        }
      );
  }

  // 根据websocket 的消息 进行处理,找到相关的主题，然后根据opterate操作
  doWithWebsocket(data) {
    //{"subject":"待审核公司","userId":null,"readGroup":"XDIDIAN","operate":"ADD"}
    if (data) {
      const m: WebsocketMessage = JSON.parse(data);
      let t; // 创建一个变量，存储 从subjectMsg中找到subject为websocket.subject相等的object
      let index;   // 满足条件对象，在原来数组中的下标
      t = this.subjectMsgs.filter(v=>v.subject == m.subject)[0];
      if (t) {
        index = this.subjectMsgs.indexOf(t);
        // 更新后的对象为：
        if (m.operate == 'ADD') {
          t.count = t.count + 1
        }
        else {
          if (t.count >= 1) {
            t.count = t.count - 1;
          }
        }
        this.subjectMsgs.splice(index, 1, t);
      }
      else {
        this.subjectMsgs.unshift({subject: m.subject, count: 1})
        this.topMsgNotEmpty = true;
      }
    }
  }


  ngOnDestroy(): void {
    if (typeof this.stompClient !== 'undefined') {
      this.stompClient.disconnect();
    }
    if (typeof this.initMsgSub != 'undefined') {
      this.initMsgSub.unsubscribe();
    }
    if (typeof this.getInitMsgSub != 'undefined') {
      this.getInitMsgSub.unsubscribe();
    }
    if(typeof this.updateMsgSub!='undefined'){
      this.updateMsgSub.unsubscribe();
    }
  }

}
