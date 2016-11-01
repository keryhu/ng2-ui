import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router,ActivatedRoute} from "@angular/router";
import {FormGroup, Validators, FormControl} from "@angular/forms";

import {Subscription,BehaviorSubject} from "rxjs/Rx";
import {NewPasswordService} from "./new-password.service";


import {StringFormat,SpinnerService,StringValidate,AuthService} from "../../../core";



@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit ,OnDestroy{

  private afterLoading:boolean=false;
  private showSuccess:boolean=false;

  private account:string;
  private token:string;
  private paramsSub:Subscription;
  private submitSub:Subscription;
  private form: FormGroup;
  //用户填写错误的token,报错的信息,来自于后台。
  private _tokenErrorMsg = new BehaviorSubject('');
  //密码重设成功,出现的提示。

  private password = new FormControl('', [Validators.required,
    this.stringFormat.passwordInSize,
    this.stringFormat.passwordContainsTwoTypes]);


  constructor(private titleService: Title, private router: Router,
              private route: ActivatedRoute,private spinner: SpinnerService,
              private stringFormat: StringFormat,private authService:AuthService,
              private newPasswordService:NewPasswordService){}

  ngOnInit(): void {
    this.spinner.stop();
    this.setTitle();
    this.form = new FormGroup({
        password: this.password
      }
    );

    this.getParam();
  }


  public setTitle() {
    this.titleService.setTitle('新地点忘记密码-输入新密码')
  }

  //获取email,token等参数。
  getParam() {
    //注意使用查询参数。routerState.queryParams
    this.paramsSub = this.route.queryParams.subscribe(
      params=> {
        this.account=params['account'];
        this.token=params['token'];
      }
    )
  }

  //当用户提交验证码后,如果后台发现错误,则显示到前端。
  getTokenError() {
    const t = this.form.value.password;
    //如果token不是6位数字,那么不显示远程的token error msg
    if (!StringValidate.password(t)) {
      this._tokenErrorMsg.next('')
    }
    return this._tokenErrorMsg;
  }

  onSubmit(data){
    console.log(data);
    this.afterLoading=true;
    const n={
      account: this.account,
      token:this.token,
      newPassword:data.password
    };

    this.submitSub=this.newPasswordService.submit(n)
      .subscribe(
        e=>{
          this.afterLoading=false;
          console.log(e);
          if(e.result&&e.result==='updateSuccess'){
            this.showSuccess=true;
          }
        },
        err=>{
          this.afterLoading=false;
          console.log(err);
          this._tokenErrorMsg.next(err);
        }

      )

  }

  getLoggedIn() {
    return this.authService.getLoggedIn();
  }


  ngOnDestroy(): void {

    if (typeof this.paramsSub!=='undefined') {
      this.paramsSub.unsubscribe();
    }

    if (typeof this.submitSub!=='undefined') {
      this.submitSub.unsubscribe();
    }
  }

}
