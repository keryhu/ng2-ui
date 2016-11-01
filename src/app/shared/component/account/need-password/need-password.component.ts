/**
 * @Description : 当用户前台,需要修改敏感内容的时候,可能需要用户当时输入用户密码,才能修改。
 * @date : 16/9/4 下午6:06
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit, EventEmitter, Output, Input, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NeedPasswordService} from "./need-password.service";
import {Subscription, BehaviorSubject} from "rxjs";

import {StringFormat,TokenObj} from "../../../../core";

@Component({
  selector: 'app-need-password',
  templateUrl: './need-password.component.html',
  styleUrls: ['./need-password.component.css']
})
export class NeedPasswordComponent implements OnInit,OnDestroy  {

  private submitPasswordSub: Subscription;

  private submitResultMsg: string;
  // 是否显示自定义的  submit result message
  private _showCustomSubmitResultMsg = new BehaviorSubject(false);

  //用户,验证密码通过后,需要被保存的内容。
  @Input() needSavedContent: Object;

  //当用户,点击,取消输入密码的时候,应该将此事件,告诉前台,让前台恢复之前的状态。
  @Output() cancelInputPassword = new EventEmitter<boolean>();

  //当用户输入密码后,验证成功,且后台成功更新信息后,发出此消息出去。
  @Output() changeInfoSuccess = new EventEmitter<boolean|Object>();


  private form: FormGroup;
  password = new FormControl('', [Validators.required, this.stringFormat.passwordInSize,
    this.stringFormat.passwordContainsTwoTypes]);

  constructor(private stringFormat: StringFormat, private needPasswordService: NeedPasswordService) {
  }

  ngOnInit() {
    this.form = new FormGroup({password: this.password});
  }

  // 当用户点击"取消输入密码的时候,我们应该将页面,恢复到 更改 内容之前。
  cancelModify() {
    this.cancelInputPassword.emit(true);
  }

  //返回当前的 自定义的  message 。
  getCustomSubmitMsgStatus(){
    if(this.password.errors){
      this.submitResultMsg='';
      this._showCustomSubmitResultMsg.next(false);
    }
    return this._showCustomSubmitResultMsg;
  }

  onSubmit(data) {

    if (this.needSavedContent) {
      const info:TokenObj=JSON.parse(localStorage.getItem('token'));
      console.log('id is : '+info.userId);

      this.needSavedContent['password']=this.password.value;
      this.needSavedContent['userId']=info.userId;

      const n=this.needSavedContent;

      console.log(n);
      this.submitPasswordSub = this.needPasswordService.validatePasswordAndSaveInfo(n)
        .subscribe(
          e=> {
            console.log(e);
            if (e&&(e.userId==n['userId']||(e.result&&e.result==true))) {
              this._showCustomSubmitResultMsg.next(true);

              if(n.hasOwnProperty('account')){
                this.submitResultMsg = '密码验证成功!';
              }
              if(e.result){
                this.submitResultMsg = '更新资料成功!';
              }

              //等待3s,传递给前台信息,更新成功了,将密码输入框,只读信息取消,然后现在正常的,更改后的信息
              setTimeout(() => {
                if(n.hasOwnProperty('account')){
                  delete n['password'];
                  n['resendToken']=e.resendToken;
                  console.log(n);
                  this.changeInfoSuccess.emit(n);
                }
                else if(n.hasOwnProperty('name')||n.hasOwnProperty('birthday')){
                  this.changeInfoSuccess.emit(true);
                }
                this._showCustomSubmitResultMsg.next(false);
                this.submitResultMsg='';
              }, 2500);
            }
            else if(e&& e.result=='tokenExpired'){
              this.cancelInputPassword.emit(true);
            }
            else {
              console.log(e.result);
              this._showCustomSubmitResultMsg.next(true);
              this.submitResultMsg = e.result;
            }
          },
          err=> {
            console.log(err);
            this._showCustomSubmitResultMsg.next(true);
            this.submitResultMsg = err;
          }
        )
    }

  }

  ngOnDestroy() {

    if (typeof this.submitPasswordSub!=='undefined') {
      this.submitPasswordSub.unsubscribe();
    }
  }


}
