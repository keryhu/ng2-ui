/**
 * @Description : please enter the description
 * @date : 2016/9/29 下午7:16
 * @author : keryHu keryhu@hotmail.com
 */


import {Component, OnInit, OnDestroy} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";


import {StringFormat,SpinnerService,PhoneExist,EmailExist,UserQueryService
} from "../../../core";
import {AddServiceService} from "./add-service.service";



@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit ,OnDestroy {


  //当点击登录按钮后，跳出来的 显示等待的图标
  private afterSubmitLoading: boolean = false;

  //保存信息是否成功。
  private saveStatus=false;

  private submitSub: Subscription;
  form: FormGroup;

  email = new FormControl('', [Validators.required, this.stringFormat.email],
    [EmailExist.validator(this.userQueryService)]);

  phone = new FormControl('', [Validators.required, this.stringFormat.phone],
    [PhoneExist.validator(this.userQueryService)]);

  name = new FormControl('', [Validators.required, this.stringFormat.peopleName]);

  password = new FormControl('', [Validators.required, this.stringFormat.passwordInSize,
    this.stringFormat.passwordContainsTwoTypes]);


  constructor(private titleService: Title, private stringFormat: StringFormat,
              private addServiceService: AddServiceService,
              private spinner: SpinnerService,private userQueryService:UserQueryService) {
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

  public setTitle() {
    this.titleService.setTitle('新地点客服系统-录入客服');
  }


  onSubmit(data){
    this.afterSubmitLoading=true;

    this.submitSub=this.addServiceService.create(data)
      .subscribe(
        e=>{
          this.afterSubmitLoading=false;
          console.log(e);
          if(e&&e.result==true){
            console.log('保存成功！');
            this.saveStatus=true;
          }

        },
        err=>{
          console.log(err);
          this.afterSubmitLoading=false;
        }
      )

  }

  // 点击 "继续录入资料的时候，事件
  continueAdd(){
    this.saveStatus=false;
    this.email.patchValue('');
    this.email.markAsUntouched();
    this.phone.patchValue('');
    this.phone.markAsUntouched();
    this.name.patchValue('');
    this.name.markAsUntouched();
    this.password.patchValue('');
    this.password.markAsUntouched();

  }



  ngOnDestroy() {

    if (typeof this.submitSub!=='undefined') {
      this.submitSub.unsubscribe();
    }
  }


}
