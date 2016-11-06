import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";


import {SpinnerService} from "../../../core";
import {TokenObj} from "../../../core/service/auth/auth.interface";


@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {
  private name:string;

  ngOnInit(): void {
    this.spinner.stop();
    this.setTitle();
    this.setName();
  }

  constructor(private titleService: Title, private spinner: SpinnerService) {
  }

  public setTitle() {
    this.titleService.setTitle('新地点会员首页')
  }

  public setName():void{
    const m:TokenObj=JSON.parse(localStorage.getItem('token'));
    if(m.name){
      this.name=m.name;
    }
  }


}
