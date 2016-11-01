/**
 * @Description : 自定义的 ，用来 不同路由导航的时候，需要等待的时候，出现的画面。
 * @date : 2016/10/1 下午2:51
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {SpinnerService} from "./spinner.service";


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],

})


export class SpinnerComponent implements OnInit,OnDestroy {

  private spinnersub: Subscription;
  public active: boolean;

  public constructor(private spinner: SpinnerService) {

  }

  ngOnInit(): void {

    this.spinnersub =this.spinner.status.subscribe((status: boolean) => {
      this.active = status;
    });
  }


  ngOnDestroy(): void {

    if(typeof this.spinnersub!=='undefined'){
      this.spinnersub.unsubscribe();
    }
  }

}
