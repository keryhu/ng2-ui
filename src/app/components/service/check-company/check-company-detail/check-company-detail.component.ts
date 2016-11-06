import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {SpinnerService} from "../../../../core";
import {CheckCompanyType} from "../../../../shared";


@Component({
  selector: 'app-check-company-detail',
  templateUrl: 'check-company-detail.component.html',
  styleUrls: ['check-company-detail.component.css']
})
export class CheckCompanyDetailComponent implements OnInit {

  // 从url resolve 获取当前 companyId，的新公司注册材料
  private newCompanyInfo:Object={};
  // 传给后台，具体的类型。是新建公司的时候首次提交，还是后来的只读，从这个区分。
  private checkCompanyType:CheckCompanyType=CheckCompanyType.AllRead;


  constructor(private spinner: SpinnerService,private router: Router,
              private route: ActivatedRoute,private titileService: Title) { }

  ngOnInit() {
    this.spinner.stop();
    this.newCompanyInfo=this.route.snapshot.data['companyRegisteredInfo'];
  }

  public setTitle() {
    this.titileService.setTitle('新地点-查看新注册公司的审核结果');
  }

  goBack(){
    this.router.navigate(['/service/check-company-edit-company']);
  }

}
