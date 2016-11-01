/**
 * 当用户输入email,或手机验证码,出现的输入框,填写验证码,以及验证码验证码是否正确,重复发送 的组件
 可以用在email激活,手机号绑定,修改email,手机号
 */

import {Component, OnInit, Input, OnDestroy, EventEmitter, Output,ViewChild} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";
import {Router} from "@angular/router";

import {AccountActivateService} from './account-activate.service';
import {CountdownService, CountStart, Constant} from "../../../../core";
import {CountdownComponent} from "../countdown";

@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.component.html',
  styleUrls: ['./account-activate.component.css']
})
export class AccountActivateComponent implements OnInit,OnDestroy {

  private afterLoading: boolean = false;

  private form: FormGroup;
  //用户填写错误的token,报错的信息,来自于后台。
  private _tokenErrorMsg = new BehaviorSubject('');
  //用户点击"重新发送"遇到的错误提示信息
  private _resendErrorMsg = new BehaviorSubject('');
  //用户点击"重新注册"遇到的错误提示信息
  private _resignupErrorMsg = new BehaviorSubject('');
  //可以点击 "重新发送按钮。"
  private _disableClickResend = new BehaviorSubject(false);

  private submitSub: Subscription;
  private resendSub: Subscription;
  private resignupSub: Subscription;

  private itemName: string;
  private applySituation: string;


  token = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]);

  constructor(private router: Router,
              private accountActivateService: AccountActivateService,
              private countdownService: CountdownService) {
  }

  ngOnInit() {
    this.form = new FormGroup({token: this.token});
    this.itemName = this.countdownName;
    this.applySituation = this.urlParams['applySituation'];


  }

  @ViewChild(CountdownComponent)
  private countdownComponent: CountdownComponent;

  @Input() countdownName: string;

  @Input() urlParams: Object;

  @Input() tokenExiredUrl: string;

  //当用户,点击取消 输入验证码的 事件,该事件传递给前台
  @Output() cancel = new EventEmitter<boolean>();

  //当用户,点击取消 输入验证码的 事件,该事件传递给前台
  @Output() tokenConfirmSuccess = new EventEmitter<any>();

  //当用户,点击"重新发送"。释放的 事件到前台。
  @Output() resendSuccess = new EventEmitter<any>();


  //手动开启 倒计时,为了刚刚注册的用户，进入页面的时候，需要开启倒计时。以后就不需要了。
  public startCoundown(data:CountStart){
    this.countdownComponent.countdown(data);
  }


  //提交验证码
  onSubmit(data) {
    this.afterLoading = true;
    this.urlParams['token'] = data.token;
    const dto = this.urlParams;
    this.submitSub = this.accountActivateService.click(dto, 'confirmToken', this.applySituation)
      .subscribe(
        e=> {
          this.afterLoading = false;
          if (e && e.result) {
            console.log(e.result);
            if (e.result == 'tokenExpired') {
              this.router.navigate([this.tokenExiredUrl]);
              this.countdownService.stop(this.itemName);
              //sessionStorage.setItem(this.itemName, '-1');
            }
            else if (e.result == 'activateSuccess') {
              sessionStorage.setItem(this.itemName, '-1');
              //其他两种情况,验证成功,所做的事情,有他们自己的组件设置
              if (this.applySituation == 'SIGNUP') {
                this.router.navigate(['login'])
              }
              else if (this.applySituation == 'RECOVER') {
                this.tokenConfirmSuccess.emit(data.token);
              }
              else if (this.applySituation == 'EDIT') {
                this.tokenConfirmSuccess.emit(true);
              }
              //如果倒计时存在,则删除对应的倒计时
              this.countdownService.stop(this.itemName);
              //sessionStorage.setItem(this.itemName, '-1');
            }
          }
          console.log(e);
        },
        err=> {
          this.afterLoading = false;
          console.log(err);
          this._tokenErrorMsg.next(err);
        }
      )
  }

  //取消输入 验证码,促发的事件
  cancelInput() {
    this.cancel.emit(true);
  }

  //-------click resend  begin-------

  resend() {
    this._disableClickResend.next(true);
    this.urlParams['token'] = this.urlParams['resendToken'];
    delete this.urlParams['resendToken'];
    const dto = this.urlParams;
    this.resendSub = this.accountActivateService.click(dto, 'resend', this.applySituation)
      .subscribe(
        e=> {
          if (e && e.resendToken) {
            let t: Object;
            if (this.applySituation == 'SIGNUP') {
              t = {
                email: this.urlParams['account'],
                resendToken: e.resendToken,
                resignupToken: e.resignupToken
              };
            }
            else if (this.applySituation == 'RECOVER') {
              t = {
                method: this.urlParams['method'],
                account: this.urlParams['account'],
                resendToken: e.resendToken
              }
            }
            else if (this.applySituation == 'EDIT') {
              t = {
                resendToken: e.resendToken
              };
              this.urlParams['resendToken'] = e.resendToken;
            }
            //将object传递给前台,让前台刷新页面
            this.resendSuccess.emit(t);

            const q: CountStart = {
              name: this.itemName,
              time: Constant.clickCoolingSeconds
            };
            this.countdownService.start(q);
          }
          if (e && e.result) {
            if (e.result == 'tokenExpired') {
              this.router.navigate([this.tokenExiredUrl]);
              this.countdownService.stop(this.itemName);
              //sessionStorage.setItem(this.itemName, '-1');
            }
          }
          console.log(e);
        },
        err=> {
          console.log(err);
          this._resendErrorMsg.next(err);
        }
      )
  }


  disableClickResend() {
    const n = sessionStorage.getItem(this.itemName);
    if (n && +n > 0) {
      this._disableClickResend.next(true);
    }
    else {
      this._disableClickResend.next(false);
    }
    return this._disableClickResend;
  }

  //-------click resend  end-------


  resignup() {
    if (this.applySituation == 'SIGNUP') {
      this.urlParams['token'] = this.urlParams['resignupToken'];
      const dto = this.urlParams;
      this.resignupSub = this.accountActivateService.click(dto, 'resignup', this.applySituation)
        .subscribe(
          e=> {
            console.log(e);
            if (e && e.result) {
              if (e.result == 'tokenExpired') {
                this.router.navigate([this.tokenExiredUrl]);
                this.countdownService.stop(this.itemName);
                //sessionStorage.setItem(this.itemName, '-1');
              }
            }
          },
          err=> {
            console.log(err);
            this._resignupErrorMsg.next(err);
          }
        )
    }
  }

  //------get  err-----begin--------------------------


  //当用户提交验证码后,如果后台发现错误,则显示到前端。
  getTokenError() {
    const t = this.form.value.token;
    const TOKEN = /^[0-9]{6}$/;
    const result = TOKEN.test(t);
    //如果token不是6位数字,那么不显示远程的token error msg
    if (!result) {
      this._tokenErrorMsg.next('')
    }

    return this._tokenErrorMsg;
  }

  getResendError() {
    return this._resendErrorMsg;
  }

  getResignupError() {
    return this._resignupErrorMsg;
  }

  //------get  err-----end--------------------------

  ngOnDestroy(): void {

    if (typeof this.submitSub !== 'undefined') {
      this.submitSub.unsubscribe();
    }

    if (typeof this.resignupSub !== 'undefined') {
      this.resignupSub.unsubscribe();
    }
    if (typeof this.resendSub !== 'undefined') {
      this.resendSub.unsubscribe();
    }
  }

}
