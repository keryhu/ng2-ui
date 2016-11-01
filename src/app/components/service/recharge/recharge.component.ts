import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../core/component/spinner/spinner.service";
import {Title} from "@angular/platform-browser";
import {Constant} from "../../../core/service/util/constant";
import {Convert} from "../../../core/service/util/convert";
import {RequestService} from "../../../core/service/auth/request.service";
import {Http, URLSearchParams} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  private url= Constant.adminQueryUserWithPage;
  private currentPage:number;
  private user: Observable<any>;

  public totalItems:number;   // 总共的数据条目
  private pageSize=15; // 每一页的 包含的条目

  constructor(private titileService: Title, private spinner: SpinnerService,
              private http: Http, private request: RequestService,
              private location: Location, private convert: Convert,
              private route: ActivatedRoute) {
    if( this.route.snapshot.queryParams){
      const m=JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
      if(m['page']){
      //  this.totalItems=this.route.snapshot.data['block']

        this.totalItems=53;
        this.currentPage=+m['page'];
        this.refreshUsers();
      }
      else{
        this.user=undefined;
      }
    }

    else {
      this.user=undefined;
    }
  }

  ngOnInit() {
    this.setTitle();
    this.spinner.stop();

  }

  public setTitle() {
    this.titileService.setTitle('新地点客服-充值页面');
  }

  startQuery(){
    this.refreshUsers(true);
    this.currentPage=1;
    this.refreshUrl();
  }


  pageChange(event) {
    //用户选择的是第几页。

    console.log('eee : '+event)
    this.currentPage=event.page;
    this.refreshUsers();
    this.refreshUrl();
  }

  refreshUrl(){
    const m={
      page:this.currentPage
    };
    const index = 'service/recharge';
    this.location.replaceState(index,
      this.convert.serializeToQueryParam(m));
  }



  refreshUsers(isClickStart?:boolean){
    const p = new URLSearchParams();
    p.set('page', (this.currentPage-1).toString());
    const result=this.http.get(this.url, this.request.getAuthOptions(p))
      .map(res=>res.json());
    this.user = result.map(e=>e.content);

    if(isClickStart){
      result.map(e=>e['totalElements'])
        .subscribe(
          e=>{
            this.totalItems=e;
            console.log(this.totalItems)
          }
        )
    }

  }


}
