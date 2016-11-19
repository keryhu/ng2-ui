import {Component, OnInit, OnDestroy} from '@angular/core';


import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {TokenService} from "../../core/service/auth/token.service";
import {RequestService} from "../../core/service/auth/request.service";
import {Http} from "@angular/http";
import {AuthService} from "../../core/service/auth/auth.service";

@Component({
  selector: 'app-re',
  templateUrl: 're.component.html',
  styleUrls: ['re.component.css']
})
export class ReComponent implements OnInit,OnDestroy {

  private msg: string;
  private endpointUrl = '/websocket/front';
  private subUrl = '/topic/testHello';

  public stompClient: any;

  constructor(private http: Http, private request: RequestService) {

  }


  ngOnInit() {

  }


  send(){
    const url='/api/websocket/front/22';
    this.http.get(url,this.request.getAuthOptions())
      .subscribe(
        e=>{
          console.log(e);
        }
      )
  }

  ngOnDestroy(): void {

  }





}
