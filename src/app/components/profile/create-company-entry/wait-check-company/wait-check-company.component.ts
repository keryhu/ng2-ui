/**
 * @Description : please enter the description
 * @date : 2016/9/26 下午10:08
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {SpinnerService} from "../../../../core";
import {CompanyType} from "../../../../shared";



@Component({
  selector: 'app-wait-check-company',
  templateUrl: './wait-check-company.component.html',
  styleUrls: ['./wait-check-company.component.css']
})
export class WaitCheckCompanyComponent implements OnInit {


  private waitCheckResolveInfo: Object = {};
  private companyPreview: boolean = false;

  // 传给后台，具体的类型。是新建公司的时候首次提交，还是后来的只读，从这个区分。
  private companyType:CompanyType=CompanyType.AllRead;

  constructor( private route: ActivatedRoute, private spinner: SpinnerService,
               private titileService: Title) {
  }

  ngOnInit(): void {
    this.spinner.stop();
    this.waitCheckResolveInfo = this.route.snapshot.data['waitCheckResolveInfo'];
    this.setTitle();
  }

  public setTitle() {
    this.titileService.setTitle('新地点客服系统-查看注册公司详细信息');
  }

  showCompanyPreview() {
    this.companyPreview = !this.companyPreview;
  }


}
