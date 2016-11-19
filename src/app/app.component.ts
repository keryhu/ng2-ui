import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription, BehaviorSubject} from "rxjs";


import {SpinnerService, AuthService} from "./core";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  public constructor(private spinner: SpinnerService, private authService: AuthService) {

  }

  private spinnersub: Subscription;
  public active: boolean;


  ngOnInit(): void {
    this.spinnersub = this.spinner.status.subscribe((status: boolean) => {
      this.active = status;
    });


  }


  @ViewChild('start') start: any;

  //切换 side menu
  toggle(event) {
    if (event) {
      this.start.toggle();
    }

  }


  //异步查看当前用户有没有登录
  getLoggedIn() {
    return this.authService.getLoggedIn();
  }




  ngOnDestroy(): void {
    if (typeof this.spinnersub !== 'undefined') {
      this.spinnersub.unsubscribe();
    }
  }
}
