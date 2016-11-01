/**
 * @Description : 用户在密码重设的时候,收到对应的验证码后,在页面输入验证码的过程页面
 * @date : 16/8/25 上午9:39
 * @author : keryHu keryhu@hotmail.com
 */


import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router,ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs/Rx";


import {Constant,SpinnerService} from "../../../core";

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.css']
})
export class CheckCodeComponent implements OnInit ,OnDestroy {
  //用户提交的 method 方法,和 账号(email或phone)
  //使用的是哪种情景,注册,edit,还是recover
  private applySituation:string='RECOVER';
  private itemName:string=Constant.recoverCountDown;
  private method:string;
  private urlParams:Object;
  private tokenExiredUrl: string='login';   //当验证码过期,需要导航到的页面
  private paramsSub:Subscription;


  constructor(private titleService: Title, private router: Router,
              private route: ActivatedRoute,private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.stop();
    this.setTitle();
    this.getParam();
  }

  //获取email,token等参数。
  getParam() {
    //注意使用查询参数。routerState.queryParams
    this.paramsSub = this.route.queryParams.subscribe(
      params=> {
        const m=params['method'];
        if(m=='EMAIL'){
          this.method='邮箱';
        }
        else if(m=='PHONE'){
          this.method='手机';
        }
        this.urlParams={
          method:m,
          account:params['account'],
          resendToken:params['resendToken'],
          applySituation: this.applySituation
        }
      }
    )
  }

  //token 验证成所做的事情,
  tokenConfirmSuccess(token:string){
    const m={
      account: this.urlParams['account'],
      token: token
    };
    console.log(m);
    this.router.navigate(['/recover/new-password'],{
      queryParams: m
    });
  }

  resendSuccess(obj:any){
    if(typeof obj=='object'&&obj.hasOwnProperty('account')){
      //转到email激活的页面。
      this.router.navigate(['/recover/check-code'], {
        queryParams: obj
      });
    }
  }

  cancel(status:boolean){
    if(status){
      this.router.navigate(['login']);
    }
  }

  public setTitle() {
    this.titleService.setTitle('新地点忘记密码-填写验证码')
  }



  ngOnDestroy(): void {

    if (typeof this.paramsSub!=='undefined') {
      this.paramsSub.unsubscribe();
    }
  }

}
