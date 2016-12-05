import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {FormGroup, FormBuilder, FormControl, FormArray, Validators} from "@angular/forms";

import {SpinnerService} from "../../../../core";
import {CheckCompanyType} from "../../../../shared";
import {CheckCompanyDetailService} from "./check-company-detail.service";
import {Subscription} from "rxjs";


// 暴露的select，reject，接口，方便，组装select对象
export interface RejectObj {
  name: string;
  value: string;
}


@Component({
  selector: 'app-check-company-detail',
  templateUrl: 'check-company-detail.component.html',
  styleUrls: ['check-company-detail.component.css']
})
export class CheckCompanyDetailComponent implements OnInit ,OnDestroy{


  // 从url resolve 获取当前 companyId，的新公司注册材料
  private newCompanyInfo: Object = {};
  // 传给后台，具体的类型。是新建公司的时候首次提交，还是后来的只读，从这个区分。
  private checkCompanyType: CheckCompanyType = CheckCompanyType.AllRead;

  private companyId:string;
  private sub:Subscription;
  // 提交后台的状态是否成功。
  private postStatus:boolean=false;

  private afterLoading:boolean=false;

  private errMsg:string;

  private allItems: Array<RejectObj> = [
    {name: 'NAME', value: '公司名字'},
    {name: 'ADDRESS', value: '公司所在地'},
    {name: 'FULLADDRESS', value: '详细地址'},
    {name: 'COMPANY_INDUSTRY', value: '公司行业'},
    {name: 'ENTERPRISE_NATURE', value: '公司性质'},
    {name: 'BUSINESS_LICENSE', value: '营业执照'},
    {name: 'INSTRUDUCTION', value: '介绍信'}
  ];
  private methods = [
    'AGREE',
    'REJECT'
  ];

  // 初始化的，错误消息
  private formErrors = {
    rejects: [
      { message: '' }
    ]
  };

  private validationMessages = {
    rejects: {
      message: {
        required: '不能为空.',
        minlength: '至少4个字符.',
        maxlength: '至多50个字符.'
      }
    }
  };

  private checkedMethd;

  private form: FormGroup;

  constructor(private spinner: SpinnerService, private router: Router,
              private route: ActivatedRoute, private titileService: Title,
              private fb: FormBuilder,
              private checkCompanyDetailService:CheckCompanyDetailService) {
  }

  ngOnInit() {
    this.spinner.stop();
    this.newCompanyInfo = this.route.snapshot.data['companyRegisteredInfo'];

    this.buildForm();

    this.route.params.forEach(e=>this.companyId=e['id']);
  }

  public setTitle() {
    this.titileService.setTitle('新地点-查看新注册公司的审核结果');
  }

  buildForm() {
    this.form = this.fb.group({
      rejects: this.fb.array([
        this.createReject()
      ])
    });
    // watch for changes and validate
    this.form.valueChanges.subscribe(data => this.validateRejects());
  }


  validateRejects() {

    let rejects = <FormArray>this.form.get('rejects');

    this.formErrors.rejects = [];

    // loop through however many formgroups are in the formarray
    let n = 1;
    while (n <= rejects.length) {

      // add the clear errors back
      this.formErrors.rejects.push({ message: '' });

      let reject = <FormGroup>rejects.at(n - 1);

      for (let field in reject.controls) {

        let input = reject.get(field);

        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.rejects[n - 1][field] =
              this.validationMessages.rejects[field][error];
          }
        }
      }

      n++;
    }
  }

  createReject() {
    return this.fb.group({
      item: [this.allItems[0]],
      message: ['',[Validators.required,Validators.minLength(4),
        Validators.maxLength(50)]]
    });
  }

  // 当调用这个方法的时候，会同时调用 submit（data），方法，所以，sumit  不用process 了
  addReject() {
    const rejects = <FormArray>this.form.get('rejects');
    // 在这里判断，有没有相同的 条目

    rejects.push(this.createReject());
  }

  removeReject(i) {

    const rejects = <FormArray>this.form.get('rejects');
    rejects.removeAt(i);
  }


  goBack() {
    this.router.navigate(['/service/check-company'], {
      queryParams: {page: 1}
    });
  }



  // 审核通过，或者审核拒绝且验证符合要求   disabled 的条件是：拒绝且valid
  submit(data) {
    console.log(data);
    console.log(this.checkedMethd)
    if(this.form.valid||this.checkedMethd=='AGREE'){
      console.log('2'
      let itemIsUnique:boolean;
      const m=data.rejects.map(e=>{
        const n={
          item: e.item.name,
          message: e.message
        };

        return n;
      });
      const items=m.map(e=>e['item']);
      let result={};
      // 这里需要判断 reject 的item是否有重复的。
      if(this.checkedMethd=='REJECT'){
        result['rejects']=m;
        // 判断item中是否有重复元素，如果有报错
        itemIsUnique=items.length===new Set(items).size;
      }

      if(itemIsUnique===false){
        this.errMsg='拒绝的条目不能重复！';
      }
      else {
        this.errMsg=undefined;
      }
      result['checkMethod']=this.checkedMethd;
      result['companyId']=this.companyId;

      if(itemIsUnique==true){
        this.afterLoading=true;
        this.sub=this.checkCompanyDetailService.submitCheckCompany(result)
          .subscribe(
            e=>{
              this.afterLoading=false;
              if(e&&e.result==true){
                console.log('保存成功！');
                this.postStatus=true;
              }
            },
            err=>{
              this.afterLoading=false;
              console.log(err);
            }
          );
      }



    }




  }

  ngOnDestroy(): void {
    if(typeof this.sub!='undefined'){
      this.sub.unsubscribe();
    }
  }


}
