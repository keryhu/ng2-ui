import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {SpinnerService} from "../../core";


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {




  constructor(private titleService: Title, private spinner: SpinnerService) {
  }


  ngOnInit() {
    this.setTitle();
    this.spinner.stop();



  }

  public setTitle() {
    this.titleService.setTitle('新地点首页')
  }






}
