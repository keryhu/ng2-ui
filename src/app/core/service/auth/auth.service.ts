/**
 * @Description : please enter the description
 * @date : 16/6/22 下午3:16
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from '@angular/core';
import {Response, Http} from "@angular/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs/Rx";



import {TokenService} from "./token.service";
import {RequestService} from "./request.service";
import {AccessTokenRest} from "./access-token-rest";
import {Constant} from "../util";
import {TokenObj, RefreshToken, RoleEnum} from "./auth.interface";


//主动设置一个 按钮用户 前台点击 退出,

@Injectable()
export class AuthService {
  private refreshSubscription: Subscription;
  private getNewTokenSub: Subscription;
  private saveTokenSub: Subscription;
  private clientId: string = Constant.clientId;
  private _loginedIn = new BehaviorSubject(false);
  private loginUrl: string = Constant.authUrl;
  private refreshToken_expired_in: number = Constant.refreshToken_expired_in;
  private accessTokenRefreshInterval: number = Constant.accessTokenValiditySeconds -
    Constant.minLeftRefreshTokenSeconds;
  //临时记录refreshToken
  private refreshToken: string;
  //临时记录access-token
  private _access_token = new BehaviorSubject('');
  private _refresh_token = new BehaviorSubject('');
  public roles: Array<string>;
  private userData: any = null;


  //存在 登录后的 redirect url,如果之前用户是因为访问某个url没有权限,那么就会暂时存储这个进 redirectUrl
  // 等到登录成功后,就会进去。
  public redirectUrl: string;

  constructor(private http: Http, private router: Router, private tokenService: TokenService,
              private requestService: RequestService, private accessTokenRest: AccessTokenRest) {
    //如果token未过期,那么就执行刷新refreshtoken
    const accessToken: string = localStorage.getItem('access-token');
    if (accessToken) {
      this.userData = this.decodeAccessToken(accessToken);
      const ex = this.userData.exp * 1000;
      //过期
      if (ex <= Date.now()) {
        this.logout()
      }
      //未过期
      else {
        this._loginedIn.next(true);
        //如果refreshtoken 还未过期,那么就执行制动刷新
        if (!this.tokenService.refreshTokenExpired()) {

          //每次浏览器刷新,都将保存在本地的  access token,更新到 BehaviorSubject里
          this._access_token.next(accessToken);

          //当刷新页面的时候,如果发现过期时间小于  正常过期时间一般的时候,自动刷新 access-token--这个就是提前刷新

          this.roles = this.userData['authorities'];

          const inte: number = this.tokenService.tokenRefreshInterval();
          //因为页面刷新了,所以设置下一次刷新的时间为动态时间。 而周期性的间隔时间不会变
          this.scheduleRefresh(inte);
        }
      }

    }


  }

  login(username: string, password: string) {

    const body = "username=" + encodeURI(username) + "&password=" + encodeURI(password) +
      "&grant_type=password&client_id=" + encodeURI(this.clientId);
    return this.http.post(this.loginUrl, body, {headers: this.requestService.getLoginHeaders()})
      .map(r=>r.json())
      .do(r=>{
        if (r['access_token']){
          localStorage.setItem('access-token', r['access_token']);
          this._loginedIn.next(true);
          //保存在loginStorage中的信息
          const token: TokenObj = {
            loginName: username,
            userId: r['userId'],
            refreshToken_expires_in: Date.now() + this.refreshToken_expired_in * 1000
          };
          localStorage.setItem('token', JSON.stringify(token));
        }

      })
      .map(r=> {
        if (r['access_token']) {
          this.refreshToken = (r['refresh_token']);
          this._access_token.next(r['access_token']);
          this._refresh_token.next(r['refresh_token']);
          const refresh_token: RefreshToken = {
            userId: r['userId'],
            refreshToken: r['refresh_token']
          };

          this.userData = this.decodeAccessToken(r['access_token']);
          this.roles = this.userData['authorities'];

          //因为存储 refreshtoken的时候,异步调用 locastorage里的access_token有可能是过时的,所以在这里  特别引入新的
          this.storeRefreshToken(refresh_token, r['access_token']);
          this.scheduleRefresh(this.accessTokenRefreshInterval * 1000);
          return r;
        }
        return r;
      })
      .catch(this.handleError);

  }


  public isLoggedIn() {
    return this._loginedIn.getValue();
  }

  public getLoggedIn() {
    return this._loginedIn;
  }

  //当页面刷新后,且用户处于登录状态,的 schedule
  scheduleRefresh(initDelay: number) {
    //Observable.timer, 间隔周期性时间为  accesstokenRefresh 刷新,且第一次刷新时间为  initDelay之后。
    //如果用户刚刚登录完,设置 initDelay=this.accessTokenRefreshInterval*1000。  如果用户刷新页面,initDelay就是动态的时间
    //值为 DynamicTokenRefreshInterval(),这个值在 ngInit里面设置
    const source = Observable.timer(initDelay, this.accessTokenRefreshInterval * 1000);

    console.log('initDelay is : ' + initDelay / 1000 + ' 秒');

    this.refreshSubscription = source.subscribe(()=> {
      console.log('正在启动 固定的系统刷新 !!!');
      this.getNewAccessToken();
    })

  }


  private storeRefreshToken(token: RefreshToken, accessToken: string) {

    this.saveTokenSub = this.accessTokenRest.save(token, accessToken)
    //当用户第一次登录时候,保存access token 到后台,延后15s执行,先保证其他任务先执行。
      .delay(15000).subscribe(
        e=> {
          console.log('store refreshToken success !');
        },
        err=> {
          console.log('store refreshToken failer ')
          localStorage.clear();
        }
      );
  }


  /**
   * 利用refreshtoken 获取新的access——token
   * @param refresh_token
   */
  public getNewAccessToken() {

    const access_token: string = localStorage.getItem('access-token');
    const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));

    this.getNewTokenSub = this.accessTokenRest.get(tokenObj.userId,access_token)
      .switchMap(e=> {
        let t: string;
        if (this._refresh_token.getValue()) {
          t = this._refresh_token.getValue();
        } else {
          t = e;
        }
        const body = "refresh_token=" + t + "&grant_type=refresh_token&client_id=" + (this.clientId);
        return this.http.post(this.loginUrl, body, {headers: this.requestService.getLoginHeaders()})
      })
      .map(e=>e.json())
      .subscribe(
        e=> {
          if (e.access_token) {
            this._access_token.next(e.access_token);
            localStorage.setItem('access-token', e['access_token']);
            console.log('stroe new access_token success ! ');
          }

          if (typeof this.saveTokenSub!=='undefined') {
            this.saveTokenSub.unsubscribe();
          }
        },
        err=> {
          //当更新失败后,自动切换到登录页面
          console.log('更新refreshToken 失败!');
          this.router.navigate(['/login']);
          this.refreshSubscription.unsubscribe();
          localStorage.clear();

          if (typeof this.saveTokenSub!=='undefined') {
            this.saveTokenSub.unsubscribe();
          }

          this._loginedIn.next(false);
        }
      )

  }


  public hasRole(role: string): boolean {
    if (this.isLoggedIn()) {
      return this.roles.some(e=>e===role);
    }
    return false;
  }

  public hasAnyRole(roles: string[]): boolean {
    //当前用户的权限,是否包含有数组中的任何一个role
    if (this.isLoggedIn()) {
      return roles.some(role=>this.hasRole(role));
    }
    return false;
  }

  // 是新地点的管理员
  public isXdidianAdmin():boolean{
    return this.hasRole(RoleEnum.ROLE_XDIDIAN_ADMIN);
  }

  public isXdidianService():boolean{
    return this.hasRole(RoleEnum.ROLE_XDIDIAN_SERVICE);
  }
  public isCompanyAdmin():boolean{
    return this.hasRole(RoleEnum.ROLE_COMPANY_ADMIN);
  }


  //解析jwt

  private decodeAccessToken(access_token: string) {
    return JSON.parse(window.atob(access_token.split('.')[1]));
  }



  public  logout() {
    this._loginedIn.next(false);
    localStorage.removeItem('access-token');
    localStorage.removeItem('token');
    this.router.navigate(['']);

    if (typeof this.refreshSubscription!=='undefined') {
      this.refreshSubscription.unsubscribe();
    }
    if (typeof this.saveTokenSub!=='undefined') {
      this.saveTokenSub.unsubscribe();
    }
  }

  private handleError(error: Response) {
    const m = error.json();
    const j = m.error_description;
    return Observable.throw(j || 'Server error');
  }


}
