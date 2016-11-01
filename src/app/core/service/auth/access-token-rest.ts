/**
 * @Description : 将refreshTokoken 保存到 后台数据库,
 * @date : 16/7/3 下午4:10
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from '@angular/core';

import {URLSearchParams, Http, Headers,RequestOptions} from "@angular/http";

import {RefreshToken} from "./auth.interface";
import {Constant} from "../util";




@Injectable()
export class AccessTokenRest {

  constructor(private http:Http) {

  }

  //因为这个方法是在 用户登录时,access-token 还没有保存到本地,所以需要参数的形式传递,异步同时进行的,所以,需要单独引用最新的 access——token
  save(token:RefreshToken,accessToken:string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${accessToken}`);
    return this.http.post(Constant.refreshTokenSaveUrl, JSON.stringify(token),
      {headers: headers});
  }

  get(userId:string,accessToken:string) {
    let params:URLSearchParams = new URLSearchParams();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${accessToken}`);
    params.set('userId', userId);
    let options = new RequestOptions({ headers: headers,search:params ,body:''});

    return this.http.get(Constant.refreshTokenGetUrl, options)
      .map(e=>e.json())
      .map(e=>e.refreshToken);
  }


}
