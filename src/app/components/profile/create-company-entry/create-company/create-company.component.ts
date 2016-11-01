/**
 * @Description : 当员工创建新的公司的时候,需要的component
 * @date : 16/9/12 下午6:16
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {Constant,SpinnerService} from "../../../../core";
import {CompanyType} from "../../../../shared";




@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {



  // routing  resolve 的名字，，这个需要传递给后台，方便后台直接拦截 resolve 的🈯️。
  private urlResolveName:string='checkCompanyResolve';

  // 传给后台，具体的类型。是新建公司的时候首次提交，还是后来的只读，从这个区分。
  private companyType:CompanyType=CompanyType.First;
  private url:string=Constant.createCompanyUrl;



  //当用户注册公司超过规定数量的时候，出现此提示信息。
  private errMsg:string;



  constructor(private route: ActivatedRoute,
              private titileService: Title,private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.stop();
    this.setTitle();

    this.errMsg=
      this.route.snapshot.data[this.urlResolveName]['newCompanyErrMsg'];

  }


  public setTitle() {
    this.titileService.setTitle('新地点－创建公司');
  }



}
