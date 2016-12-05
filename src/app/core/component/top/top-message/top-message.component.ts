import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Router} from "@angular/router";

import {TokenObj, TokenService, AuthService} from "../../../service";

import {TopMessageService} from "./top-message.service";
import {Subscription, Observable} from "rxjs";

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

  //private sendUrl = '/pcAngular2/hello'
  // 查看message是否为空，也就是说有没有未读消息，从前台传过来。
  private topMsgNotEmpty: Observable<boolean>;

  private subjectMsgs: Observable<Array<SubjectMsg>>;
  private initMsgSub: Subscription;
  private getInitMsgSub: Subscription;
  private updateMsgSub: Subscription;


  constructor(private authService: AuthService, private tokenService: TokenService,
              private router: Router, private topMessageService: TopMessageService) {}

  ngOnInit() {
    // 使用异步方法，促使 用户登录后，马上能够显示 未读消息
    this.topMsgNotEmpty=this.topMessageService.initMessageAfterLoginedIn()
      .map(e=>e.length > 0);

    this.subjectMsgs=this.topMessageService.initMessageAfterLoginedIn();

    // 上面那个是 登录 促发的，下面这个是 刷新页面促发的
    if (this.authService.isLoggedIn()){
     this.refreshMessage();
    }


  }

  // 从top-navbar传递过来，用户是否登录，为什么要top-navbar传递过来，
  // 因为一旦用户退出登录，能第一时间知道

  @Input() isLogged:Observable<boolean>;


  // 用户点击 某一个message促发的事件
  clickMessage(message) {
    console.log(message);
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
        this.updateMessage('公司注册失败');
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


  // 用户点击 刷新 ，查看是否有新消息，避免刷新浏览器，整个页面刷新，同时代替 websocket功能
  refreshMessage(){
    this.topMsgNotEmpty=this.topMessageService.getInitMessages()
      .map(e=>e.length > 0);
    this.subjectMsgs=this.topMessageService.getInitMessages();
  }

  // 当用户点击 菜单的时候，更新 未读消息。
  // 后台数据库处理，也就是直接删除掉 subject 为此value 的message，然后返回给前台该数据

  updateMessage(value: string) {

    this.topMsgNotEmpty=this.topMessageService.updateMessage(value)
      .map(e=>e.length > 0);
    this.subjectMsgs=this.topMessageService.updateMessage(value);
  }



  ngOnDestroy(): void {

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
