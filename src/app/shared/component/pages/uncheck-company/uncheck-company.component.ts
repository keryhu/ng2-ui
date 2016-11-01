/**
 * @Description :  新公司注册，提交公司注册的申请材料，提交后，查看已经提交的只读材料
 * 新地点客服人员或管理人，审核公司材料的时候，查看到的只读材料，，审核后，如果被拒绝，会员看到的只读材料
 * 和编辑需要修改的材料，并且再次提交。
 *
 * 为了区分是否只读，还是部分只读，还是全部只读，从前台传递参数来区分。
 * 【first,edit,allRead】,分这三种情况，
 * 如果是first，那么就是除了管理员姓名，全部可编辑。
 * 2 如果是edit，那么就是部分可编辑，根据传递过来的 具体的可编辑的 key 名字决定，其他的只读。
 * 3 如果是allRead，那么就是所有的都是只读。
 * @date : 2016/10/10 下午3:13
 * @author : keryHu keryhu@hotmail.com
 */


import {Component, OnInit, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, BehaviorSubject} from "rxjs";

import {FormGroup, FormControl, Validators} from "@angular/forms";
import {
  CompanyNameValidate, UserQueryService, StringFormat,TokenObj,
  Convert
} from "../../../../core";
import {AddressComponent} from "../../address";
import {CompanyType} from "./company-type.enum";
import {UncheckCompanyService} from "./uncheck-company.service";

@Component({
  selector: 'app-uncheck-company',
  templateUrl: './uncheck-company.component.html',
  styleUrls: ['./uncheck-company.component.css']
})
export class UncheckCompanyComponent implements OnInit {

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
  //设置 所有的 input 是否是只读。
  private readType = {};


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
              private uncheckCompanyService: UncheckCompanyService) {
  }

  @ViewChild(AddressComponent)
  private addressComponent: AddressComponent;

  ngOnInit() {
    this.form = new FormGroup({
      name: this.name,
      fullAddress: this.fullAddress,
      companyIndustry: this.companyIndustry,
      enterpriseNature: this.enterpriseNature
    });
    if(this.companyType == 0 ){
      this.companyIndustries =
        this.route.snapshot.data[this.urlResolveName]['companyIndustries'];

      this.enterpriseNatures =
        this.route.snapshot.data[this.urlResolveName]['enterpriseNatures'];

      //初始化 公司行业和公司性质
      this.companyIndustry.patchValue(this.defaultCompanyInfustry);
      this.enterpriseNature.patchValue(this.defaultEnterpriseNature);
    }


    const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
    this.adminLoginName = tokenObj.loginName;

    if (this.companyType == 0 || this.companyType == 2) {
      const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
      this.adminLoginName = tokenObj.loginName;
    }

    //------------set only read------------------------
    if(this.companyType==2){
      const n = this.companyInfo['address'];
      this.address = `${n['province']} ${n['city']} ${n['county']}`;
      this.businessLicense = `data:image/${this.companyInfo['businessLicenseType']};base64,${this.companyInfo['businessLicense']}`;
      this.intruduction = `data:image/${this.companyInfo['intruductionType']};base64,${this.companyInfo['intruduction']}`;

    }

  }

  //提交过来的company信息，如果没有信息，也是正常的，一般代表是：  用户第一次提交注册公司的时候出现。
  @Input() companyInfo: Object;

  // 代表 company post 被保存的地址url，一般是用户第一次读取注册，或者被拒绝，修改信息再次提交。
  @Input() submitUrl: string;

  @Input() companyType: CompanyType;    // 前台传入具体的类型。

  //需要使用 comopany 组件的 前台 路由 resolve 的名字，例如createCompany  routing resolve
  // 传递过来的名字。如果前台直接传递 boject，那么就不需要这个名字了。
  @Input() urlResolveName: string;

  //当用户点击 submit 的时候，促发的事件。
  @Output() clickSubmit = new EventEmitter<Object>();

  // 当选择 公司行业的时候，促发的事件
  onCompanyIndustryChange(value: string) {
    this.companyIndustry.patchValue(value);
  }

  onEnterpriseNatureChange(value: string) {
    this.enterpriseNature.patchValue(value);

  }

  setReadType() {
    switch (this.companyType) {
      case 0:
        break;
      case 1:
        this.readType['name'] = false;
        //如果select 省，市，是只读，那么通过 ngIf 来设置，原来的select为隐藏，显示 input 只读。
        this.readType['address'] = false;
        this.readType['fullAddress'] = false;
        this.readType['companyIndustry'] = false;
        this.readType['enterpriseNature'] = false;
        //管理员姓名，忽略，因为他永远都是只读。
        // 上传图片这块，通过ngIf 来设置，如果是只读，那么就将fileUpload 隐藏。
        this.readType['businessLicense'] = false;
        this.readType['intruduction'] = false;
        break;
      case 2:
        this.readType['name'] = false;
        //如果select 省，市，是只读，那么通过 ngIf 来设置，原来的select为隐藏，显示 input 只读。
        this.readType['address'] = false;
        this.readType['fullAddress'] = false;
        this.readType['companyIndustry'] = false;
        this.readType['enterpriseNature'] = false;
        //管理员姓名，忽略，因为他永远都是只读。
        // 上传图片这块，通过ngIf 来设置，如果是只读，那么就将fileUpload 隐藏。
        this.readType['businessLicense'] = false;
        this.readType['intruduction'] = false;
        break;
      default:
        break
    }

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


  //检测是否可以提交。
  canSubmit(): boolean {
    // 验证提交的 信息必需要跟原来的信息不同。2 本身的验证

    return false;

  }

  onSubmit(data) {
    this.afterSubmit = true;
    console.log(data);
    this.addressComponent.getData();

    // 提交给后台的data is
    const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));
    data.address = this.addressComponent.getData();
    data.adminId = tokenObj.userId;

    console.log('提交的数据为：  ' + JSON.stringify(data));

    const businessFile = this.convert.dataURItoFile(this.businessImg.getValue());
    const intruductionFile = this.convert.dataURItoFile(this.intruductionImg.getValue());

    this.submitSub = this.uncheckCompanyService.submit(
      JSON.stringify(data), this.submitUrl, businessFile, intruductionFile)
      .subscribe(
        e=> {
          console.log(e['_body']);
          console.log(typeof e['_body'] == 'string');
          console.log();
          const m: Object = JSON.parse(e['_body']);
          if (m['result'] == true) {
            console.log('注册成功。');
            this.router.navigate(['/profile/new-company/wait-check'])
          }
          console.log(e);
        }
      )
  }

}
