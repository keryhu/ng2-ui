/**
 * @Description : please enter the description
 * @date : 2016/9/30 下午3:59
 * @author : keryHu keryhu@hotmail.com
 */


import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {Title} from "@angular/platform-browser";

import {Subscription} from "rxjs";
import {SpinnerService} from "../../../core";
import {DelServiceService} from "./del-service.service";

@Component({
  selector: 'app-del-service',
  templateUrl: 'del-service.component.html',
  styleUrls: ['del-service.component.css']
})
export class DelServiceComponent implements OnInit ,OnDestroy {

  private form: FormGroup;
  private serviceInfo: Array<Object>;

  //当点击提交按钮后，跳出来的 显示等待的图标
  private afterLoading: boolean = false;
  private submitSub: Subscription;
  private fieldList = [];   //根据 名字检索后，的客服名单，默认显示全部

  constructor(private route: ActivatedRoute, private editService: DelServiceService,
              private titleService: Title,private spinner: SpinnerService) {

  }

  ngOnInit(): void {
    this.spinner.stop();
    this.setTitle();
    this.fieldList = this.route.snapshot.data['serviceInfo'].slice();

    //必需要 建立一个复制的对象。
    this.serviceInfo = this.route.snapshot.data['serviceInfo'];
    //将 user的id 设置到 checkBox里面
    const m = {};
    this.fieldList.forEach(e=>m[e['id']] = new FormControl('', []));

    this.form = new FormGroup(m);


  }

  public setTitle() {
    this.titleService.setTitle('新地点客服系统-编辑客服')
  }

  // 根据姓名，搜索符合条件的客服。
  search(value: string) {
    console.log(value);
    this.fieldList = this.serviceInfo
      .filter(e=>new RegExp(value, 'gi').test(e['name']));

  }

  //全选
  allChecked() {
    const m = {};
    this.fieldList.forEach(e=> {
      m[e['id']] = true;
    });

    this.form.setValue(m, {onlySelf: true});
  }

  // 清空所有的选择
  notChecked() {
    const m = {};
    this.fieldList.forEach(e=> {
      m[e['id']] = false;
    });

    this.form.setValue(m, {onlySelf: true});
  }

  submitValidate():boolean{
    return this.fieldList.some(e=>this.form.controls[e['id']].value===true)
  }

  submit(data) {
    this.afterLoading = true;

    const m = Object.keys(data)
      .filter(e=>data[e] === true);


    this.submitSub = this.editService.del(m)
      .subscribe(
        e=> {
          if(e&&e.result===true){
            this.afterLoading=false;
            this.fieldList=this.fieldList.filter(e=>m.every(v=>e['id']!==v));
          }
        },
        err=> {
          this.afterLoading = false;
        }
      )
  }

  ngOnDestroy(): void {
    if (typeof this.submitSub !== 'undefined') {
      this.submitSub.unsubscribe();
    }
  }

}
