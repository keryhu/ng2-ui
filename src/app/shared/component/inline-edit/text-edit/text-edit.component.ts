/**
 * click edit component
 */

import {Component, OnInit, EventEmitter,Input, Output} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css']
})
export class TextEditComponent implements OnInit {

  private _showInput=new BehaviorSubject(false);
  constructor() {
  }

  //前台传递过来的,需要编辑的 content
  @Input() content: string|number;

  //能否点击  "内容",从而 编辑内容。
  @Input() canClickEdit:boolean;

  //将文本提交的内容,提交给 前台。
  @Input() errMsg: string;    //错误信息显示

  @Output() submitData = new EventEmitter<any>();

  @Output() clickEdit=new EventEmitter<boolean>();
  @Output() cancelEdit=new EventEmitter<boolean>();

  ngOnInit() {
    if(!this.canClickEdit){
      this._showInput.next(false);
    }

  }

  getInputShowStatus():Observable<boolean>{
    return this._showInput;
  }

  edit(el: HTMLElement) {
    if(this.canClickEdit){
      this._showInput.next(true);
      this.clickEdit.emit(true);
      setTimeout(() => {
        el.focus();
      }, 100);
    }

  }


  onSubmit(data:string) {
    this.submitData.emit(data);
  }

  //当用户点击,取消更改的时候,促发的事件
  cancelModify() {
    this._showInput.next(false);
    this.cancelEdit.emit(true);
  }


}
