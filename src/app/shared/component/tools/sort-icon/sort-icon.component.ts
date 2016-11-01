import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Sort} from "../../account/search/sort";





@Component({
  selector: 'app-sort-icon',
  templateUrl: './sort-icon.component.html',
  styleUrls: ['./sort-icon.component.css']
})
export class SortIconComponent implements OnInit {

  private name:string='sort';

  constructor() { }

  // 当切换 不同的  sort icon 的时候，释放事件告诉前台。好让前台处理排序。
  @Output() toggleSortName=new EventEmitter<Sort>();

  // 前台传递过来的 sort 的名字,sort 的排序，
  // 例如如果要 按照email 排序，那么就将 email关键字传递过来
  @Input()  sortParam:Sort;

  ngOnInit() {
    switch (this.sortParam.direction){
      case 'asc':
        this.name='arrow_drop_up';
            break;
      case 'desc':
        this.name='arrow_drop_down';
            break;
      case 'none':
        this.name='sort';
            break;
      default:
        this.name='sort';
    }
  }

  //切换不同的 sort icon
  toggle(){
   console.log(this.sortParam);
    if(this.name==='sort'){
      this.name='arrow_drop_up';

      this.toggleSortName.emit(new Sort(this.sortParam.property,'asc'));
    }
    else if(this.name==='arrow_drop_up'){
      this.name='arrow_drop_down';

      this.toggleSortName.emit(new Sort(this.sortParam.property,'desc'));
    }
    else if(this.name==='arrow_drop_down'){
      this.name='sort';

      this.toggleSortName.emit(new Sort(this.sortParam.property,'none'));
    }
  }

}
