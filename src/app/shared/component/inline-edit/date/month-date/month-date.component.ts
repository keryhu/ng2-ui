/**
 * @Description : 包含 月份,和日期的  选择器,同时还是一个  inlien edit 编辑器。
 * @date : 16/9/6 下午3:54
 * @author : keryHu keryhu@hotmail.com
 */
import * as moment from 'moment';

import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";


@Component({
  selector: 'app-month-date',
  templateUrl: './month-date.component.html',
  styleUrls: ['./month-date.component.css']
})
export class MonthDateComponent implements OnInit {

  private form: FormGroup;
  month = new FormControl('', []);
  date = new FormControl('', []);
  private months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  private smallMonth = [4, 6, 9, 11];
  private maxDate: number = 30;
  private dates = [];
  private mm = 6;
  private dd = 15;

  private errMsg: string;

  private showOriginalContent: boolean = true;


  //前台传递过来的,需要编辑的 时间
  @Input() content: string;

  //点击提交的时候,所提交给前台的数据  iso string
  @Output() submitData = new EventEmitter<string>();


  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      month: this.month,
      date: this.date,
    });
    for (let i = 0; i < this.maxDate; i++) {
      this.dates.push(i + 1);
    }

    this.month.patchValue(this.mm);
    this.date.patchValue(this.dd);

  }

  //用户点击,原先的date 的事件。
  clickDate() {
    this.showOriginalContent = false;
  }

  //选择 月份的时间
  onMonthChange(value: number) {
    //如果选择的是 30天的月份,

    if (this.smallMonth.some(e=>e === +value)) {
      this.maxDate = 30;
    }
    else if (2 === +value) {
      this.maxDate = 29;
    }
    else {
      this.maxDate = 31;
    }

    this.month.patchValue(value);


    for (let i = 0; i < this.maxDate; i++) {
      this.dates.push(i + 1);
    }
  }

  //选择 天 的事件
  onDateChange(value: number) {
    if (+value == 31) {
      this.months = [1, 3, 5, 7, 8, 10, 12];
    }
    this.date.patchValue(value);
  }

  // 取消更改
  cancelModify() {
    this.showOriginalContent = true;
    this.errMsg = undefined;
  }

  onSubmit(data) {

    if (moment(this.content).month() + 1 == +(this.month.value) &&
      moment(this.content).date() == +(this.date.value)) {
      this.errMsg = '生日没有更改!';
    }
    else {
      const m = moment().year(1999).month(this.month.value-1)
        .date(this.date.value)
        .format('YYYY-MM-DD');
      this.submitData.emit(m);
      this.showOriginalContent = true;
      this.errMsg = undefined;
    }

  }


}
