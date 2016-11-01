/**
 * @Description : please enter the description
 * @date : 2016/9/26 下午10:08
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";


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

  constructor( private route: ActivatedRoute, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.stop();
    this.waitCheckResolveInfo = this.route.snapshot.data['waitCheckResolveInfo'];

  }

  showCompanyPreview() {
    this.companyPreview = !this.companyPreview;
  }


}
