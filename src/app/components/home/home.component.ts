import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {SpinnerService} from "../../core";
import {Observable} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  private m = [
    {A: 'a', p1: 1},
    {A: 'b', p1: 2},
    {A: 'c', p1: 3}
  ];
  private mm = Observable.of(this.m)


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
