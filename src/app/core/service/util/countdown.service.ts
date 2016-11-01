
/**
 * @Description : 链接  倒计时的，全局 service
 * @date : 2016/10/19 下午9:36
 * @author : keryHu keryhu@hotmail.com
 */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

// name 表示保存到 本地localstorage 的名字，，而number表示，倒计时多久
export interface CountStart{
  name:string;
  time:number;
}

@Injectable()
export class CountdownService{

  constructor(){}

  private countdownStart= new Subject<CountStart>();
  private countdownStop= new Subject<string>();

  //结束倒计时
  countdownStart$=this.countdownStart.asObservable();
  countdownStop$=this.countdownStop.asObservable();

  start(c:CountStart){
    this.countdownStart.next(c);
    console.log('receive count start object : '+c);
  }


  // 即将要停止的倒计时的 localstorage 名字
  stop(name:string){

    this.countdownStop.next(name);
  }

}
