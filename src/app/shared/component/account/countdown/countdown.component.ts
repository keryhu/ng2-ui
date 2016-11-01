/**
 * @Description : 单独设定的倒计时 程序,应用的 几分钟倒计时的前台程序,例如防止用户重复点击 发送某个链接。
 * @date : 16/7/18 下午3:59
 * @author : keryHu keryhu@hotmail.com
 */


import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {Observable, Subscription, BehaviorSubject} from "rxjs/Rx";


import {CountdownService, CountStart} from "../../../../core/";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html'
})
export class CountdownComponent implements OnInit ,OnDestroy{

  private countdownSub: Subscription;

  // 以数值的形式，表示当前倒计时的数值 的 value
  private showTime=new BehaviorSubject(false);


  //显示倒计时 时间
  private timeMsg: string;

  constructor(private countdownService: CountdownService) {
  }

  // 前台传递过来的 itemname 名字。
  @Input() itemName:string;

  ngOnInit() {

    const n = sessionStorage.getItem(this.itemName);
    //如果click 倒计时未过期,则执行 Observable 刷新。
    if (n && +n > 0) {
      const t:CountStart={
        name:this.itemName,
        time:+n
      };

      this.countdown(t);

    }

    this.countdownService.countdownStart$
      .subscribe(
        e=>{
          this.itemName=e['name'];
          this.countdown(e);
        }
      );

    this.countdownService.countdownStop$
      .subscribe(
        e=>{
          this.clean(e);
        }
      )
  }



  //倒计时转换程序  不会大于1个小时,3600秒
  private ms(t): string {
    //当显示的数字小于10的时候,自动前面补齐0
    const pad = n=>n <= 9 ? '0' + n : n;
    const minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    const seconds = t % 60;
    return [
      pad(minutes) + ' 分',
      pad(seconds) + ' 秒'
    ].join('')
  }



  countdown(data) {
    if(data['time']>0){

      const source = Observable.interval(1000)
        .map(e=> {
          data['time']--;
          if (data['time'] >= 0) {
            this.showTime.next(true);
            sessionStorage.setItem(data['name'], data['time'].toString());
          }
          else{
            this.showTime.next(false);
          }

          return data['time'];
        })
        .share()
        .filter(x=>x >= 0);

      this.countdownSub = source
        .subscribe(()=> {
          this.timeMsg = this.ms(data['time']);
        })
    }
  }

  // clean 制定itemName 的 倒计时
  clean(name:string):void{
    if(sessionStorage.getItem(name)){
      sessionStorage.removeItem(name);
    }

  }


  ngOnDestroy() {

    const n = sessionStorage.getItem(this.itemName);
    sessionStorage.removeItem(this.itemName);
    //当click时间过期的时候,执行:
    if (!n || +n <=0) {
      //当注销,或者页面跳转的时候,自动将倒计时清零。
      if (typeof this.countdownSub!=='undefined') {
        this.countdownSub.unsubscribe();
      }
    }
  }

}
