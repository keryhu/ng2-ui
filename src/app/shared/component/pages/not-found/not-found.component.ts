import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Location} from '@angular/common';
import {SpinnerService} from "../../../../core/component/spinner/spinner.service";

// 不需要spinner


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private titleService:Title,private _location: Location,
              private spinner: SpinnerService){}

  ngOnInit(){
    this.setTitle();
    this.spinner.stop();
  }

  public setTitle(){
    this.titleService.setTitle('新地点404页面')
  }

  goBack(){
    this._location.back();
  }

}
