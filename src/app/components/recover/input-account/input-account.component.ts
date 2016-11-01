/**
 * @Description : 找回账号,第一步,输入账号的页面
 * @date : 16/8/23 下午7:06
 * @author : keryHu keryhu@hotmail.com
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Subscription, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

import {FormGroup, Validators, FormControl} from "@angular/forms";


import {InputAccountService} from "./input-account.service";
import {RecoverAccount} from "../recover-account";


import {StringFormat,SpinnerService} from "../../../core";


@Component({
  selector: 'app-input-account',
  templateUrl: './input-account.component.html',
  styleUrls: ['./input-account.component.css']
})
export class InputAccountComponent implements OnInit,OnDestroy {

  private form: FormGroup;
  private submitSub: Subscription;
  private _errMsg = new BehaviorSubject('');

  private username = new FormControl('', [Validators.required,
    this.stringFormat.emailOrPhone]);//异步验证必须单独分开一个数组,多个状态可以合并到一个数组里。



  ngOnInit(): void {
    this.spinner.stop();
    this.setTitle();
    this.form = new FormGroup({
      username: this.username
    });
  }


  constructor(private titleService: Title, private stringFormat: StringFormat,
              private inputAccountService: InputAccountService,private router: Router,
              private spinner: SpinnerService) {
  }

  public setTitle() {
    this.titleService.setTitle('新地点忘记密码-输入账号')
  }

  getErrMsg() {
    if (!this.form.valid) {
      this._errMsg.next('');
    }
    return this._errMsg;
  }

  onSubmit(data) {
    this.submitSub = this.inputAccountService.submit(data.username)
      .subscribe(
        r=> {
          console.log(r);
          if (r.result) {
            console.log(r.result);
            this._errMsg.next(r.result);
          }
          else {
            const m: RecoverAccount = {
              email: r.email,
              phone: r.phone
            };

            this.router.navigate(['recover/method']);
            sessionStorage.setItem('recover',JSON.stringify(m));

          }

        }
      )

  }

  ngOnDestroy(): void {

    if(typeof this.submitSub!=='undefined'){
      this.submitSub.unsubscribe();
    }
  }



}
