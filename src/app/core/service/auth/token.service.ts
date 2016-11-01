/**
 * @Description : 检查 access token 有没有过期。
 * @date : 16/8/21 上午9:46
 * @author : keryHu keryhu@hotmail.com
 */
import {Injectable} from "@angular/core";
import { Http,Response} from "@angular/http";


import {Constant} from "../util";
import {RequestService} from "./request.service";
import {TokenObj} from "./auth.interface";


@Injectable()
export class TokenService {
    private token: string = localStorage.getItem('access-token');
    private tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));

    constructor(private http:Http,private request: RequestService) {
    }


    //从本地localStorage 获取 当前用户 登录名

    loginName(): string {
        if (this.tokenObj && this.token) {
            return this.tokenObj.loginName;
        }
        else {
            return '';
        }
    }


    //access-token 过期的时间点。
    accessTokenExpiredAt(): number {
        if (this.token) {
            const userData = JSON.parse(window.atob(this.token.split('.')[1]));
            const ex = userData.exp * 1000;
            return ex;
        }
        return Date.now();
    }

    //access token 固定的刷新时间
    tokenRefreshInterval(): number {
        const leftRefreshTokenSeconds: number = Constant.minLeftRefreshTokenSeconds;
        return this.accessTokenExpiredAt() - Date.now() - 1000 * leftRefreshTokenSeconds;
    }


    //返回refresh token 有没有过期
    refreshTokenExpired(): boolean {
        if (this.tokenObj) {
            return this.tokenObj.refreshToken_expires_in <= Date.now();
        }
        return true;
    }

    getCsrf():string{
      const re = new RegExp("XSRF-TOKEN=([^;]+)");
      const value = re.exec(document.cookie);
      return (value !== null) ? decodeURI(value[1])  : null;
    }


    csrfToken(){
      const url='/api/csrf';
      return this.http.get(url)
        .map((res: Response)=> {
          return res.json();
        })

    }

}
