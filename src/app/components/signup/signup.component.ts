/**
 * @Description : 会员注册的ts
 * @date : 16/6/19 上午10:36
 * @author : keryHu keryhu@hotmail.com
 */
import {Component, OnInit} from  '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

import {SignupService} from "./signup.service";


import {
  EmailExist, StringFormat, PhoneExist, SpinnerService, UserQueryService
} from "../../core";



@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {

  //当点击登录按钮后，跳出来的 显示等待的图标
  private afterSignupLoading: boolean = false;

  private signupSub: Subscription;
  form: FormGroup;

  email = new FormControl('', [Validators.required, this.stringFormat.email],
    [EmailExist.validator(this.userQueryService)]);

  phone = new FormControl('', [Validators.required, this.stringFormat.phone],
    [PhoneExist.validator(this.userQueryService)]);

  name = new FormControl('', [Validators.required, this.stringFormat.peopleName]);

  password = new FormControl('', [Validators.required, this.stringFormat.passwordInSize,
    this.stringFormat.passwordContainsTwoTypes]);


  constructor(private titleService: Title, private signupService: SignupService,
              private stringFormat: StringFormat, private router: Router,
              private spinner: SpinnerService, private userQueryService: UserQueryService) {
  }


  ngOnInit() {
    this.spinner.stop();
    this.form = new FormGroup({
      email: this.email,
      phone: this.phone,
      name: this.name,
      password: this.password
    });

    this.setTitle();

  }

  public
  setTitle() {
    this.titleService.setTitle('新地点注册页面')

  }

  gotoLogin() {
    console.log('ssss')
  }


  onSubmit(data) {
    this.afterSignupLoading = true;
    this.signupSub = this.signupService.create(data).subscribe(
      e=> {
        if (e && e.email) {
          const email = e.email;
          const resendToken = e.resendToken;
          const resignupToken = e.resignupToken;

          //转到email激活的页面。
          this.router.navigate(['/email-activate'], {
            queryParams: {
              email: email, resendToken: resendToken, resignupToken: resignupToken,
              first: true
            }
          });

        }
      }
    )
  }


  ngOnDestroy() {

    if (typeof this.signupSub !== 'undefined') {
      this.signupSub.unsubscribe();
    }
  }

}
