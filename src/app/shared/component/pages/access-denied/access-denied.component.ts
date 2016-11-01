/**
 * @Description : please enter the description
 * @date : 16/7/10 下午1:19
 * @author : keryHu keryhu@hotmail.com
 */

import {Component,OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Location} from '@angular/common';
import {SpinnerService} from "../../../../core";

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(private titleService:Title,private _location: Location,
              private spinner: SpinnerService){}

  ngOnInit(){
    this.spinner.stop();
    this.setTitle();
  }

  public setTitle(){
    this.titleService.setTitle('新地点无权访问页面')
  }

  goBack(){
    this._location.back();
  }

}
