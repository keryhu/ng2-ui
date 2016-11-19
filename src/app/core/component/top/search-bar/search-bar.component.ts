import {Component, OnInit, ViewChild, EventEmitter, AfterViewInit, AfterViewChecked} from '@angular/core';
import {MdInput} from "@angular/material";
import {Http} from "@angular/http";
import {Output} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit,AfterViewInit,AfterViewChecked {

  constructor(private http:Http) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.input.focus();
  }

  ngAfterViewChecked(): void {

  }


  @ViewChild('input') input: MdInput;

  // 当 离开 input 焦点事件，传给前台。目的blur还没有实现
  @Output() blurSearch=new EventEmitter<boolean>();

  search(value:string){
    console.log('start search,value is : '+value);
  }



}
