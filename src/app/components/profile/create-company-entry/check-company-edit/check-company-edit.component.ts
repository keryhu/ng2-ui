import {Component, OnInit} from '@angular/core';

import {CheckCompanyObject} from "../../../../shared/component/pages/check-company-template/check-company-object.interface";
import {
  CheckCompanyType,
  CheckCompanyReadWrite
} from "../../../../shared";
import {ActivatedRoute} from "@angular/router";
import {Constant} from "../../../../core/service/util/constant";

@Component({
  selector: 'app-check-company-edit',
  templateUrl: 'check-company-edit.component.html',
  styleUrls: ['check-company-edit.component.css']
})
export class CheckCompanyEditComponent implements OnInit {

  private checkCompanyForCompanyResolve: Object = {};
  private checkCompanyType: CheckCompanyType = CheckCompanyType.Edit;
  // 这个传递给 check-template 为了获取后台的 公司行业和企业性质的材料
  private urlResolveName:string='checkCompanyForNameResolve';
  private errMsg:string;
  // 当用户修改完申请材料后，提交后台的post url
  private url=Constant.createCompanyAfterRejectUrl;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkCompanyForCompanyResolve =
      this.route.snapshot.data['checkCompanyForCompanyResolve'];

    this.errMsg=
      this.route.snapshot.data[this.urlResolveName]['newCompanyErrMsg'];
  }



}
