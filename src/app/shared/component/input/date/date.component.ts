import {Component, OnInit, Injectable, Output, EventEmitter} from '@angular/core';
import {NgbDateStruct, NgbDatepickerConfig, NgbDatepickerI18n} from "@ng-bootstrap/ng-bootstrap";
import {Input} from "@angular/core/src/metadata/directives";
import {ViewChild} from "@angular/core/src/metadata/di";
import * as moment from 'moment';
const I18N_VALUES = {
  zh: {
    weekdays: ['一', '二', '三', '四', '五', '六','日'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月',
      '11月', '12月'],
  },

};



// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor() {
    super();
  }

  getWeekdayName(weekday: number): string {
    return I18N_VALUES['zh'].weekdays[weekday - 1];
  }
  getMonthName(month: number): string {
    return I18N_VALUES['zh'].months[month - 1];
  }
}


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  private _model:any;

  constructor(private config: NgbDatepickerConfig) {
    // customize default values of datepickers used by this component tree
    this.config.minDate = {year: 2016, month: 8, day: 1};
    this.config.maxDate = {year: 2099, month: 12, day: 31};
    this.config.firstDayOfWeek=7;
  }

  //  data string
  @Input() newDate:string;

  @ViewChild('d') d:any;

  // change date 促发的事件，更新到前台。
  @Output() changeDate = new EventEmitter<string>();

  ngOnInit() {
    // 将前台传递来的时间，转为 日期datePicker显示
    if(this.newDate){

      this.model={
        year:moment(this.newDate).year(),
        month:moment(this.newDate).month()+1,
        day:moment(this.newDate).date(),
      };
    }
  }


  get model(){
    return this._model;
  }


  set model(value){
    this._model=value;
    const m=JSON.parse(JSON.stringify(this.model));
    m.month=m.month-1;
    this.changeDate.emit(moment(m).format('YYYY-MM-DDTHH:mm:ss'));
  }



}
