/**
 * @Description : 新地点的客服审核新的注册公司的程序代码
 *
 * @date : 2016/10/9 下午2:52
 * @author : keryHu keryhu@hotmail.com
 */

import {Component,OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {SpinnerService} from "../../../core";



@Component({
  selector: 'app-check-company',
  templateUrl: './check-company.component.html',
  styleUrls: ['./check-company.component.css']
})
export class CheckCompanyComponent implements OnInit {
  private unCheckedCompany:Array<Object>;

  private ms=["abc","edf","ghi","jkl","mno"]

  constructor( private route: ActivatedRoute, private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.stop();
    this.unCheckedCompany=this.route.snapshot.data['unCheckedCompany'];
    console.log(this.unCheckedCompany);
  }

  //当点击company 展开细节的时候，促发的事件
  clickCompany(m){

    console.log(m);
  }

}
