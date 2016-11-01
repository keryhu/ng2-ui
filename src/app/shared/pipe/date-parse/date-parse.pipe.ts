import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
require('moment/locale/zh-cn');
moment.locale('zh-cn');

@Pipe({
  name: 'dateParse'
})
/**
 *
 *  longDateFormat : {
            LT : 'Ah点mm分',
            LTS : 'Ah点m分s秒',
            L : 'YYYY-MM-DD',
            LL : 'YYYY年MMMD日',
            LLL : 'YYYY年MMMD日Ah点mm分',
            LLLL : 'YYYY年MMMD日ddddAh点mm分',
            l : 'YYYY-MM-DD',
            ll : 'YYYY年MMMD日',
            lll : 'YYYY年MMMD日Ah点mm分',
            llll : 'YYYY年MMMD日ddddAh点mm分'
        },
 */
// spring ,返回的date 格式是 数组形式 【year，yue，日】，将这个对象转为js date对象。
export class DateParsePipe implements PipeTransform {

  // 传递过来的是 java date string iso 格式。
  transform(value: string, args?: string): any {

    const  m=['LT','LTS','L','LL','LLL','LLLL','l','ll','lll','llll'];

    if(moment(value).isValid()){
      if(args&&m.some(e=>e===args)){
        return moment(value).format(args);
      }
      else if(args==='birthday'){
        return moment(value).format('M月DD日') ;
      }
      else if(typeof args==='undefined'){
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
      }
    }
    else return '';



  }

}
