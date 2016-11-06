import {Component, OnInit, ViewChild, Input, OnDestroy} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Subscription, BehaviorSubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {CompanyNameValidate, Convert, UserQueryService, StringFormat,
  TokenObj} from "../../../../core";

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
  // 自定义包含省份，地级市，县的 的address
  private address: string;

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
    if(this.checkCompanyType==0||
      (this.checkCompanyType==1&&this.companyInfo.companyIndustry.readWrite==1)){
      this.companyIndustries =
        this.route.snapshot.data[this.urlResolveName]['companyIndustries'];
      this.companyIndustry.patchValue(this.defaultCompanyInfustry);

    }
    if(this.checkCompanyType==0||
      (this.checkCompanyType==1&&this.companyInfo.companyIndustry.readWrite==1)){
      this.enterpriseNatures =
        this.route.snapshot.data[this.urlResolveName]['enterpriseNatures'];
      this.enterpriseNature.patchValue(this.defaultEnterpriseNature);
    }
    // 设置 admin login name  first和edit，都是自己使用，所以可以用，
    // allRead都不需要，是自己事后查看注册材料和新地点的管理人员审核资料，
    // 这两个情况忽略管理员姓名
    if(this.checkCompanyType==0||this.checkCompanyType==1){
      const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
      this.adminLoginName = tokenObj.loginName;
    }

    // 当只读，或者edit的时候，需要读取后台的营业执照和介绍信
    if(this.checkCompanyType==2|| this.checkCompanyType==1){
      this.businessLicense = `data:image/${this.companyInfo['businessLicenseType']};base64,${this.companyInfo.businessLicense.value}`;
      this.intruduction = `data:image/${this.companyInfo['intruductionType']};base64,${this.companyInfo.intruduction.value}`;
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
      console.log('cancel');
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
      console.log('cancel');
      this.intruductionImg.next('');
    }

  }

  onSubmit(data) {
    if(this.checkCompanyType==0||this.checkCompanyType==1){
      this.afterSubmit = true;
      console.log(data);
      // 获取到的是，【省份，地级市，县】 的Observable array
      const address=this.addressComponent.getAddressArray();

      // 提交给后台的data is
      const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));

      data.adminId = tokenObj.userId;

      console.log('提交的数据为：  ' + JSON.stringify(data));

      const businessFile = this.convert.dataURItoFile(this.businessImg.getValue());
      const intruductionFile = this.convert.dataURItoFile(this.intruductionImg.getValue());

      this.submitSub = this.checkCompanyTemplateService.submit(
        data,address,this.submitUrl, businessFile, intruductionFile)
        .subscribe(
          e=> {
            console.log(e['_body']);
            console.log(typeof e['_body'] == 'string');
            const m: Object = JSON.parse(e['_body']);
            if (m['result'] == true) {
              console.log('注册成功。');
              this.router.navigate(['/profile/new-company/wait-check-company'])
            }
            console.log(e);
          }
        )
    }

  }


  ngOnDestroy(): void {
    if(typeof this.submitSub!='undefined'){
      this.submitSub.unsubscribe();
    }
  }

}
