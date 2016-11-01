import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Subscription, BehaviorSubject} from "rxjs";


import {Constant,StringValidate,TokenObj} from "../../../../core";
import {EditTextService} from "./edit-text.service";


@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.css']
})
export class EditTextComponent implements OnInit,OnDestroy {

  //被修改的名字，是姓名／邮箱／手机／生日 一种
  private keyName:string;
  private isName: boolean;
  private isEmailOrPhone: boolean;
  private showEditNameHint = new BehaviorSubject(false);
  private itemName: string = Constant.editCountDown;
  private canClickEdit: boolean = true;
  private nameModifyTime: Date;
  private editMsg: string;
  private commonValue: string;  //是email,姓名,或是手机号的  的任何一种值
  private newCommonValue: string; // value 修改后,曾现的值
  private needSavedCommonObject: Object;  // value 对象,转给need password 组件
  private showReadOnly: boolean = false;  //当用户修改完姓名后,如果用户输入的信息验证通过,那么将 显示 这个只读,然后要求用户输入密码
  private showInputCode: boolean = false;  //当用户更改email或phone 的时候,验证密码成功后,显示验证码输入框的 判断
  private cannotEditNameErrMsg: string;
  private nameCanModifyOrSaveSub: Subscription;
  private accountCanModifyOrSaveSub: Subscription;

  private showAccountActivatedComponent: boolean = false;
  private emailOrPhoneHint: string;
  private urlParams: Object = {};


  constructor(private editTextService: EditTextService) {
  }

  ngOnInit(): void {

    if (this.content) {
      if (this.content.hasOwnProperty('name')) {
        this.keyName='姓名';
        this.isName = true;
        this.commonValue = this.content['name'];
        this.canClickEdit = this.content['nameCanModify'];
        this.nameModifyTime = this.content['nameModifyTime']
      }
      else if (this.content.hasOwnProperty('account')) {
        this.isEmailOrPhone = true;
        this.commonValue = this.content['account'];
        this.canClickEdit = true;
        if (StringValidate.email(this.content['account'])) {
          this.keyName='邮箱';
          this.emailOrPhoneHint = '邮箱'
        }
        else if (StringValidate.phone(this.content['account'])) {
          this.emailOrPhoneHint = '手机';
          this.keyName='手机';
        }
      }
    }
  }

  //将 姓名,或手机号,或邮箱 传递过来。传递来的时候,是一个object。例如{name:'xx'},或{email:'xx'}
  @Input() content: Object;

  submitEdit(data) {

    if (this.isName) {
      console.log('click name');
      this.startEditName(data);
    }
    else if (this.isEmailOrPhone) {
      console.log('click email or phone');
      this.startEditAccount(data);
    }

  }

  clickEdit(event) {
    if (this.isName && this.canClickEdit) {
      if (event) {
        this.showEditNameHint.next(true);
      }
    }
  }

  cancelEdit(event) {
    if (event) {
      this.showEditNameHint.next(false);
      this.editMsg = undefined;
    }
  }

  //当用户输入密码,验证成功后,的事件
  needPasswordChangeSuccess(event: boolean|Object) {
    if (typeof event == 'boolean') {
      if (this.isName) {
        this.showReadOnly = false;
        this.commonValue = this.newCommonValue;
        this.canClickEdit = false;
      }
    }
    if (typeof event == 'object' && event.hasOwnProperty('account')) {
      //需要再次输入验证码
      this.showInputCode = true;
      this.showAccountActivatedComponent = true;

      //当注册成功后,自动开启"重新发送的" 倒计时。
      sessionStorage.setItem(this.itemName,
        Constant.clickCoolingSeconds.toString());

      event['applySituation']='EDIT';
      this.urlParams=event;
      console.log(this.urlParams);

    }

  }

  //当用户点击,取消输入密码的时候,恢复最初的状态
  cancelInputPassword(event) {
    if (event) {
      this.showReadOnly = false;
    }
  }

  //------------------------编辑name的时候,特有的方法-------------------------

  //当姓名不能编辑的时候,如何显示错误信息。
  mouseOverName() {
    if (this.isName && !this.canClickEdit) {
      let d: Date = this.nameModifyTime ? this.nameModifyTime : new Date();
      //60天为到,不能修改
      this.cannotEditNameErrMsg = `60天不能修改姓名,上次修改时间为: 
             ${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 `;

    }

  }

  mouseLeaveName() {
    this.cannotEditNameErrMsg = '';
  }

//------------自定义的3个方法,,用户点击 姓名,email或手机修改的时候,促发的privte 方法

  //当修改后的姓名,点击提交促发的事件
  private startEditName(data: string): void {
    console.log('data is : ' + data + ' , commonValue is : ' + this.commonValue);

    if (StringValidate.peopleName(data) &&(data!==this.commonValue)) {
      const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
      const newName = {
        userId: tokenObj.userId,
        name: data
      };
      this.nameCanModifyOrSaveSub = this.editTextService
        .validateNameCanModifyOrSave(newName)
        .subscribe(
          e=> {
            if (e && e.result) {
              //验证了,名字可以修改
              // 如果名字通过验证
              this.showReadOnly = true;
              this.newCommonValue = data;
              this.needSavedCommonObject = {
                name: data
              }
            }
          },
          err=> {
          }
        );

    }
    else if (!StringValidate.peopleName(data)) {
      this.editMsg = '姓名不规范';
    }

    else if (data===this.commonValue) {
      this.editMsg = '姓名不能和原来相同';
    }
  }


  //用户点击 编辑email粗发的事件
  private startEditAccount(data: string): void {
    const emailOrPhone: boolean = StringValidate.email(data) || StringValidate.phone(data);

    if (emailOrPhone && (data!==this.commonValue)) {
      const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
      const newAccount = {
        userId: tokenObj.userId,
        account: data
      };
      this.accountCanModifyOrSaveSub = this.editTextService
        .validateAccountCanModifyOrSave(newAccount)
        .subscribe(
          e=> {
            if (e && e.result) {
              //验证了,email可以修改
              // 如果名字通过验证
              this.showReadOnly = true;
              this.newCommonValue = data;
              this.needSavedCommonObject = {
                account: data
              }
            }
          },
          err=> {
            if(err){
              if(this.keyName==='手机'){
                this.editMsg = '手机号已注册，无法修改！';
              }
              else if(this.keyName==='邮箱'){
                this.editMsg = '邮箱已注册，无法修改！';
              }
            }
            console.log(err);
          }
        )
    }
    else if (this.keyName==='邮箱'&&!StringValidate.email(data)) {
      this.editMsg = '邮箱不规范';
    }

    else if (data===this.commonValue && StringValidate.email(data)) {
      this.editMsg = '邮箱不能和原来相同';
    }
    else if (this.keyName==='手机'&&!StringValidate.phone(data)) {
      this.editMsg = '手机号不规范';
    }

    else if (data===this.commonValue && StringValidate.phone(data)) {
      this.editMsg = '手机号不能和原来相同';
    }
  }

  //当email或者phone 修改的时候，新的email或phone，验证码验证成功的时候，从account－activated发过来的消息

  tokenConfirmSuccess(event) {
    if (event) {
      this.showReadOnly = false;
      this.showInputCode = false;
      this.commonValue = this.newCommonValue;
      this.showAccountActivatedComponent = false;

    }
  }

  cancelAccountActivate(event) {
    if (event) {
      this.showReadOnly = false;
      this.showInputCode = false;
      this.showAccountActivatedComponent = false;
    }
  }

  resendSuccess(event) {
    if(event&&typeof event=='object'&&event.hasOwnProperty('resendToken')){
      sessionStorage.setItem(this.itemName,
        Constant.clickCoolingSeconds.toString());
    }
  }

  ngOnDestroy() {

    if (typeof this.nameCanModifyOrSaveSub!=='undefined') {
      this.nameCanModifyOrSaveSub.unsubscribe();
    }

    if (typeof this.accountCanModifyOrSaveSub!=='undefined') {
      this.accountCanModifyOrSaveSub.unsubscribe();
    }

  }

}
