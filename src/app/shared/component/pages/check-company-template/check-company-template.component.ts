import {Component, OnInit, ViewChild, Input, OnDestroy} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Subscription, BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {
  CompanyNameValidate, Convert, UserQueryService, StringFormat,
  TokenObj
} from "../../../../core";

import {CheckCompanyTemplateService} from "./check-company-template.service";
import {AddressComponent} from "../../address/address.component";
import {CheckCompanyType} from "./check-company.interface";
import {CheckCompanyObject} from "./check-company-object.interface";

@Component({
  selector: 'app-check-company-template',
  templateUrl: 'check-company-template.component.html',
  styleUrls: ['check-company-template.component.css']
})
export class CheckCompanyTemplateComponent implements OnInit,OnDestroy {


  private form: FormGroup;
  private defaultCompanyInfustry = '农、林、牧、渔业';
  private defaultEnterpriseNature = '政府机关/事业单位';
  //-----上传 营业执照 ----
  private uploadBusinessButtonValue: string = '上传营业执照';
  private uploadInstructionbuttonValue: string = '上传介绍信';
  // 营业执照，强制 只能最大 500kb，且不做 缩放处理
  private acceptType: string = 'image/*';
  private maxSize: number = 500 * 1024;
  private minResizeSize: number = 500 * 1024;
  private companyIndustries: Array<string>;   // 公司行业

  private enterpriseNatures: Array<string>;   // 公司性质
  private adminLoginName: string; // 管理员姓名，申请注册公司帐户的用户，就是平台管理员
  private businessImg = new BehaviorSubject('');
  private intruductionImg = new BehaviorSubject('');
  //当点击登录按钮后，跳出来的 显示等待的图标
  private afterSubmit: boolean = false;
  private submitSub: Subscription;

  private name = new FormControl('', [Validators.required,
      this.stringFormat.companyName],//异步验证必须单独分开一个数组,多个状态可以合并到一个数组里。
    [CompanyNameValidate.validator(this.userQueryService)]);

  private fullAddress = new FormControl('', [Validators.required]);

  private companyIndustry = new FormControl('', []);  //公司行业

  private enterpriseNature = new FormControl('', []);  //公司性质
  //---------------for  read only----------------------------
  private businessLicense: string;
  private intruduction: string;
  private errMsg: string;

  constructor(private stringFormat: StringFormat, private userQueryService: UserQueryService,
              private router: Router, private route: ActivatedRoute, private convert: Convert,
              private checkCompanyTemplateService: CheckCompanyTemplateService) {
  }

  @ViewChild(AddressComponent)
  private addressComponent: AddressComponent;

  //提交过来的company信息，如果没有信息，也是正常的，
  // 一般代表是：  用户第一次提交注册公司的时候出现。
  @Input() companyInfo: CheckCompanyObject;

  // 代表 company post 被保存的地址url，一般是用户第一次读取注册，或者被拒绝，修改信息再次提交。
  @Input() submitUrl: string;

  @Input() checkCompanyType: CheckCompanyType;    // 前台传入具体的类型。

  //需要使用 comopany 组件的 前台 路由 resolve 的名字，例如createCompany  routing resolve
  // 传递过来的名字。如果前台直接传递 boject，那么就不需要这个名字了。
  //  公司新建和 申请人，事后查看已经被拒绝的申请材料的时候，需要resolve 公司行业，
  // 公司性质
  @Input() urlResolveName: string;


  ngOnInit() {
    this.form = new FormGroup({
      name: this.name,
      fullAddress: this.fullAddress,
      companyIndustry: this.companyIndustry,
      enterpriseNature: this.enterpriseNature
    });


    // 获取公司行业和公司性质的远程数据-需要的情景：
    //  first=0或edit=1且 readWrite 为write，
    if (this.checkCompanyType == 0 ||
      (this.checkCompanyType == 1 && this.companyInfo.companyIndustry.readWrite == 1)) {
      this.companyIndustries =
        this.route.snapshot.data[this.urlResolveName]['companyIndustries'];
      this.companyIndustry.patchValue(this.defaultCompanyInfustry);

    }
    if (this.checkCompanyType == 0 ||
      (this.checkCompanyType == 1 && this.companyInfo.companyIndustry.readWrite == 1)) {
      this.enterpriseNatures =
        this.route.snapshot.data[this.urlResolveName]['enterpriseNatures'];
      this.enterpriseNature.patchValue(this.defaultEnterpriseNature);
    }
    // 设置 admin login name  first和edit，都是自己使用，所以可以用，
    // allRead都不需要，是自己事后查看注册材料和新地点的管理人员审核资料，
    // 这两个情况忽略管理员姓名
    if (this.checkCompanyType == 0 || this.checkCompanyType == 1) {
      const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
      this.adminLoginName = tokenObj.loginName;
    }

    // 当只读，或者edit的时候，需要读取后台的营业执照和介绍信
    if (this.checkCompanyType == 2 || this.checkCompanyType == 1) {
      this.businessLicense = `data:image/${this.companyInfo['businessLicenseType']};base64,${this.companyInfo.businessLicense.value}`;
      this.intruduction = `data:image/${this.companyInfo['intruductionType']};base64,${this.companyInfo.intruduction.value}`;
    }


    if (this.checkCompanyType == 1) {
      // 当checkCompanyType 为edit，且营业执照的readWrite 为1，更换button的value
      if (this.companyInfo.businessLicense.readWrite == 1) {
        this.uploadBusinessButtonValue = '更换营业执照';
      }
      // 当checkCompanyType 为edit，且介绍信的readWrite 为1，更换button的value
      if (this.companyInfo.intruduction.readWrite == 1) {
        this.uploadInstructionbuttonValue = '更换介绍信';
      }
    }


  }

  // 当选择 公司行业的时候，促发的事件
  onCompanyIndustryChange(value: string) {
    this.companyIndustry.patchValue(value);
  }

  onEnterpriseNatureChange(value: string) {
    this.enterpriseNature.patchValue(value);

  }

  // 查看上传的文件，是否为空，用来验证 提交按钮 是否可以点击。
  checkUploadImg(): boolean {
    if (this.intruductionImg.getValue() && this.businessImg.getValue()) {
      return true;
    }
    else {
      return false;
    }
  }


  //上传 营业执照 预览完成。
  uploadBusinessComplete(event) {

    if (event && event.status) {
      if (event.content) {
        this.businessImg.next(event.content);
      }
    }
    //如果用户，取消点击上传 按钮，则恢复到数据库保存的 图片。
    if (event && event.cancel) {
      this.businessImg.next('');
    }

  }


  //上传 介绍信 预览完成。
  uploadIntruductionComplete(event) {
    if (event && event.status) {
      if (event.content) {
        this.intruductionImg.next(event.content);
      }
    }
    //如果用户，取消点击上传 按钮，则恢复到数据库保存的 图片。
    if (event && event.cancel) {
      this.intruductionImg.next('');
    }

  }

  // 检测submit 是否可以提交
  canSubmit(): boolean {
    if (this.checkCompanyType == 0) {
      return this.form.valid && this.checkUploadImg();
    }
    else if (this.checkCompanyType == 1) {

      let nameValid = true;
      // name valid
      if (this.companyInfo.name.readWrite == 1) {
        nameValid = this.name.valid && (this.name.value !== this.companyInfo.name.value);
      }

      let fullAddressValid = true;
      if (this.companyInfo.fullAddress.readWrite == 1) {
        fullAddressValid = this.fullAddress.valid &&
          (this.fullAddress.value !== this.companyInfo.fullAddress.value);
      }
      // 营业执照
      let businessValid = true;
      if (this.companyInfo.businessLicense.readWrite == 1) {
        businessValid = this.businessImg.getValue() ? true : false;
      }

      // 介绍信
      let intruductionValid = true;
      if (this.companyInfo.intruduction.readWrite == 1) {
        intruductionValid = this.intruductionImg.getValue() ? true : false;
      }
      return nameValid && fullAddressValid && businessValid && intruductionValid;
    }
    else {
      return false;
    }
  }

  onSubmit(data) {


    if (this.checkCompanyType == 0 || this.checkCompanyType == 1) {
      this.afterSubmit = true;

      let address: Observable<string>;
      let businessFile;
      let intruductionFile;
      let data2 = {};

      // 将data 的值复制过去。
      if (data) {
        data2 = JSON.parse(JSON.stringify(data));
      }
      if ((this.checkCompanyType == 1&&this.companyInfo.address.readWrite == 1)
        || this.checkCompanyType == 0) {
        // 获取到的是，【省份，地级市，县】 的Observable array
        address = this.addressComponent.getAddressArray();
      }

      if (this.checkCompanyType == 0) {
        // 提交给后台的data is
        const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
        data2['adminId'] = tokenObj.userId;
      }

      console.log('提交的数据为：  ' + JSON.stringify(data2));
      if ((this.checkCompanyType==1 &&
        this.companyInfo.businessLicense.readWrite == 1)
        || this.checkCompanyType == 0) {
        businessFile = this.convert.dataURItoFile(this.businessImg.getValue());
      }

      if ((this.checkCompanyType==1&&
        this.companyInfo.intruduction.readWrite == 1)
        || this.checkCompanyType == 0) {
        intruductionFile = this.convert.dataURItoFile(this.intruductionImg.getValue());
      }

      this.submitSub = this.checkCompanyTemplateService.submit(
        this.submitUrl,data2,address, businessFile, intruductionFile)
        .subscribe(
          e=> {
            console.log(e['_body']);
            console.log(typeof e['_body'] == 'string');
            const m: Object = JSON.parse(e['_body']);
            if (m['result'] == true) {
              console.log('注册成功。');
              this.router.navigate(['/profile/create-company/wait-check-company'])
            }
            console.log(e);
          },
          err=>{
            this.afterSubmit=false;
            if(err){
              if(err['_body']){
                const m=JSON.parse(err['_body']);
                this.errMsg=m['message'];
              }
            }
          }
        )

    }

  }


  ngOnDestroy(): void {
    if (typeof this.submitSub != 'undefined') {
      this.submitSub.unsubscribe();
    }
  }

}
