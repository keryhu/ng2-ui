import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormControl, Validators, FormGroup} from "@angular/forms";


import {Subscription} from "rxjs";

import {ChangePasswordService} from "./change-password.service";
import {StringFormat,TokenObj,StringValidate} from "../../../../core";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit ,OnDestroy{

  private form: FormGroup;
  private submitSub:Subscription;
  private originPasswordErrMsg:string;
  private newPasswordSuccessMsg :string;

  public afterLoading:boolean=false;

  originPassword = new FormControl('', [Validators.required, (control: FormControl)=>this.stringFormat.passwordInSize(control),
    (control: FormControl)=>this.stringFormat.passwordContainsTwoTypes(control)]);

  newPassword = new FormControl('', [Validators.required,
    this.stringFormat.passwordInSize,
    this.stringFormat.passwordContainsTwoTypes]);



  constructor(private stringFormat: StringFormat,private changePasswordService:ChangePasswordService) {
  }


  //当用户,取消修改密码的时候，粗发的事件

  @Output() cancelChangePassword = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.form = new FormGroup({
      originPassword: this.originPassword,
      newPassword:this.newPassword
    });
  }


  // 新密码不能与原密码相等
  passwordCouldNotEqual(control:FormControl){
    if (!control.value) {
      return null;
    }
    else if(!StringValidate.password(control.value)){
      return null;
    }

    const equale:boolean=this.originPassword.value==this.newPassword.value;

    return equale?{couldNotEqual:true}:null;


  }


  onSubmit(data){
    this.afterLoading=true;
    const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
    data.id=tokenObj.userId;
    const equale:boolean=this.originPassword.value==this.newPassword.value;
    console.log('两个密码相等吗？ '+equale);
    this.submitSub=this.changePasswordService.submit(data)
      .subscribe(
        e=>{
          this.afterLoading=false;
          //Object {result: true}
          if(e&&typeof e['result']=='boolean'&& e['result']){
            this.newPasswordSuccessMsg='密码修改成功';
            setTimeout(()=>{
              this.cancelChangePassword.emit(true);
              this.newPasswordSuccessMsg='';
            },2500);
          }
          console.log(e);
        },
        err=>{
          this.afterLoading=false;
          console.log(err);
          this.originPasswordErrMsg=err;
        }
      )

  }

  ngOnDestroy(): void {

    if (typeof this.submitSub!=='undefined') {
      this.submitSub.unsubscribe();
    }
  }


}
