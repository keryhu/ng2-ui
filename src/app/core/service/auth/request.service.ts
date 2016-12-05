/**
 * @Description : 设置全局的header，这里还设置了一个方法，可以异步获取access token
 * @date : 16/7/4 上午9:58
 * @author : keryHu keryhu@hotmail.com
 */

import {URLSearchParams, Headers,RequestOptions,Response} from "@angular/http";

import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/Rx";

import {Constant} from "../util";




@Injectable()
export class RequestService {
  private clientId:string = Constant.clientId;
  private clientSecret:string = Constant.clientSecret;
  private basicSecret:string=btoa(`${this.clientId}:${this.clientSecret}`);

  // 为了异步获取access-token，因为从本地localStorage里面获取有时候或有延时


  //service , contstrctor 中的方法,不能放到 ngOnInit 中

  private asyAuthHeaderSource=new Subject<Headers>();

  asyAuthHeader$=this.asyAuthHeaderSource.asObservable();


  getJsonHeaders():Headers {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }


  getAuthHeaders() :Headers{
    const headers = this.getJsonHeaders();
    const token = localStorage.getItem('access-token');
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
  }

  // fro rc5 bug get
  getAuthOptions(params?:URLSearchParams):RequestOptions{
    if(params){
      return new RequestOptions({ headers: this.getAuthHeaders(),search:params,body:''});
    }
    else {
      return new RequestOptions({ headers: this.getAuthHeaders(),body:''});
    }

  }

  //fro rc5
  getJsonOptions(params?:URLSearchParams):RequestOptions{
    if(params){
      return new RequestOptions({ headers: this.getJsonHeaders(),search:params,body:''});
    }
    else {
      return new RequestOptions({ headers: this.getJsonHeaders(),body:''});
    }

  }


  getLoginHeaders():Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + this.basicSecret);
    return headers;
  }

  //默认的错误处理,这个指spring 后台报的 RuntimeException
  //,自己需要的 error 对象 {"code":404,"message":"sss"}
  defaultHandlerError(error:Response) {

    //将错误信息,转为数组,找到'}"开始之后的内容,就是自定义的的内容。
    const x = error['_body'];

    const m = JSON.parse(x);
    console.log(m);
    return Observable.throw(m.message || 'Server error');


  }

  //  异步获取 header，topMessage 组件，address 组件，都调用了这个。
  getAsyAuthHeaders(token:string){
    const headers = this.getJsonHeaders();
    headers.append('Authorization', `Bearer ${token}`);
    this.asyAuthHeaderSource.next(headers);
  }
}
