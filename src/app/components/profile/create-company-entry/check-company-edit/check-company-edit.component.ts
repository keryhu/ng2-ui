import {Component, OnInit} from '@angular/core';

import {CheckCompanyObject} from "../../../../shared/component/pages/check-company-template/check-company-object.interface";
import {
  CheckCompanyType,
  CheckCompanyReadWrite
} from "../../../../shared";

@Component({
  selector: 'app-check-company-edit',
  templateUrl: 'check-company-edit.component.html',
  styleUrls: ['check-company-edit.component.css']
})
export class CheckCompanyEditComponent implements OnInit {

  private checkCompanyType: CheckCompanyType = CheckCompanyType.Edit;
  private newCompanyInfo: CheckCompanyObject = {

    name: {
      value: 'name',
      readWrite: CheckCompanyReadWrite.Write,
      rejectMsg: 'notssd '
    },
    address: {
      value: '上海市黄浦区',
      readWrite: CheckCompanyReadWrite.Write,
      rejectMsg: '地址错误 '
    },
    fullAddress: {
      value: 'fullAddress',
      readWrite: CheckCompanyReadWrite.Read,
    },
    companyIndustry: {
      value: 'companyIndustry',
      readWrite: CheckCompanyReadWrite.Write,
      rejectMsg: 'not '
    },
    enterpriseNature: {
      value: 'enterpriseNature',
      readWrite: CheckCompanyReadWrite.Read
    },
    businessLicense:{
      value:'businessLicense',
      readWrite: CheckCompanyReadWrite.Read
    },
    intruduction:{
      value:'intruduction',
      readWrite: CheckCompanyReadWrite.Read
    }
  };
  // routing  resolve 的名字，，这个需要传递给后台，方便后台直接拦截 resolve 的🈯️。
  private urlResolveName:string='checkCompanyEditResolve';

  constructor() {
  }

  ngOnInit() {

  }



}
