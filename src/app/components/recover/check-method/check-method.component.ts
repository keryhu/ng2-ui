
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {CheckMethodService} from "./check-method.service";
import {RecoverAccount} from "../recover-account";


import {SpinnerService,Constant} from "../../../core";

@Component({
  selector: 'app-check-method',
  templateUrl: './check-method.component.html',
  styleUrls: ['./check-method.component.css']
})
export class CheckMethodComponent implements OnInit,OnDestroy {

  private recoverAccount: RecoverAccount;

  //  显示在前台页面的 email
  private emailDis: string;
  //显示在前台页面的  手机号
  private phoneDis: string;
  private submitSub: Subscription;

  private afterLoading:boolean=false;
  // 现在在前台的radio值
  private methods=[
    'EMAIL',
    'PHONE'
  ];
  private checkedMethd;

  constructor(private titleService: Title, private router: Router,
              private checkMethodService: CheckMethodService,
              private spinner: SpinnerService) {
  }

  public setTitle() {
    this.spinner.stop();
    this.titleService.setTitle('新地点忘记密码-选择取回方式')
  }

  ngOnInit(): void {
    this.spinner.stop();
    this.setTitle();

    if(sessionStorage.getItem('recover')){
      this.recoverAccount = JSON.parse(sessionStorage.getItem('recover'));
      this.setdisplay();
    }
    else{
      this.router.navigate(['/recover']);
    }

  }



  onSubmit() {
    this.afterLoading=true;

    const m={
      account: this.recoverAccount[this.checkedMethd.toLowerCase()],
      method: this.checkedMethd
    };
    this.submitSub = this.checkMethodService.submit(m)
      .subscribe(
        e=> {

          this.afterLoading=false;
          //Object {result: "tokenExpired"}  如果验证码过期,导航到  login页面
          if(e.result&&(e.result==='tokenExpired')){
            this.router.navigate(['login']);
          }

          console.log(e);
          if(e.method){
            this.router.navigate(['/recover/check-company-edit-code'],{
              queryParams: e
            });
            sessionStorage.setItem(Constant.recoverCountDown,Constant.clickCoolingSeconds.toString())
          }
          //Object {resendToken: "92092b2c-5d3e-4b1b-a1b8-c988afcc6534"}  如果返回的是resendToken
          // 说明此账号之前已经请求过类似的  找回密码。那么直接导航到相应的页面即可。
          if(e.resendToken){

            this.router.navigate(['/recover/check-company-edit-code'],{
              queryParams:{
                method: m.method,
                account:m.account,
                resendToken:e.resendToken
              }
            });

            // 如果转到该页面的时候,没有倒计时,那么就重新开始倒计时。
            const n=sessionStorage.getItem(Constant.recoverCountDown);
            if(!n||+n<0){
              sessionStorage.setItem(Constant.recoverCountDown,Constant.clickCoolingSeconds.toString())
            }
          }
        },
        err=>{
          this.afterLoading=false;
          this.router.navigate(['/recover']);
        }
      )
  }


  setdisplay(): void {

    const e = this.recoverAccount.email;
    console.log(e);
    const index = e.indexOf('@');
    const startE = e.substr(0, 2);
    const endE = e.substr(index);
    const p = this.recoverAccount.phone.substr(9);
    const five = '*'.repeat(5);
    const nine = '*'.repeat(9);
    this.emailDis = `向${startE}${five}${endE}发送电子邮件`;
    this.phoneDis = `向${nine}${p}发送短信`;
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('recover');

    if (typeof this.submitSub!=='undefined') {
      this.submitSub.unsubscribe();
    }
  }
}
