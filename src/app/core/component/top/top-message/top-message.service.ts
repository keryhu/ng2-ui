import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Http, Response} from "@angular/http";


import {AuthService, TokenService, RequestService,Constant} from "../../../service";



@Injectable()
export class TopMessageService {

  private queryUrl = Constant.querySubjectMsgUrl;
  private updateUrl = Constant.updateSubjectMsgUrl;

  constructor(private http: Http, private request: RequestService) {
  }


  // 当用户登录后，由requestService促发的 事件，让导航栏的 icon，刷新成 有新消息的 icon
  initMessageAfterLoginedIn() {
    return this.request.asyAuthHeader$
      .switchMap(e=> {
        if (e) {
          return this.http.get(this.queryUrl, this.request.getAuthOptions())
        }
      })
      .map((res: Response)=>res.json())
  }

  //这个是 页面正常刷新的时候，获取 未读消息的 方法。
  getInitMessages() {
    return this.http.get(this.queryUrl, this.request.getAuthOptions())
      .map((res: Response)=>res.json())
  }

  // 当点击 menu 的时候，促发的事件，这里包含了 导航到新的页面
  clickMenu(){

  }

  // 用户点击菜单，更新后台的未读消息
  updateMessage(value: string){
    const data = {subject: value};
    return this.http.post(this.updateUrl, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=> {
        return res.json()
      })
  }



}
