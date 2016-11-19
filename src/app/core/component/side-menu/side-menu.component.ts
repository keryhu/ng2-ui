import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {URLSearchParams, RequestOptions, Response, Headers, Http} from "@angular/http";


import {AuthService,RequestService,TokenObj,Constant} from "../../service";





export interface Menu{
  name:string;
  url:string
}


@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit,OnDestroy {


  private menus: Observable<Array<Menu>>;
  private sub: Subscription;

  constructor(private authService: AuthService,
              private http: Http, private request: RequestService) {

  }

  ngOnInit(): void {


    if (this.authService.getLoggedIn) {
      this.menus = this.getMenus().map(e=>e['menus']);
    }

    this.sub = this.getMenus()
      .subscribe(
        e=> {
          const name = e['name'];
          const m: TokenObj = JSON.parse(localStorage.getItem('token'));
          m.name = name;
          localStorage.setItem('token', JSON.stringify(m));
        }
      )

  }


  getMenus() {
    const headers = new Headers();
    const token = localStorage.getItem('access-token');
    const tokenObj: TokenObj = JSON.parse(localStorage.getItem('token'));

    const url = Constant.getMenusUrl;
    const params = new URLSearchParams();
    params.set('id', tokenObj.userId);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    let options = new RequestOptions({headers: headers, search: params, body: ''});
    return this.http.get(url, options)
      .map((res: Response)=> {
        return res.json()
      })
      .catch(this.request.defaultHandlerError);
  }


  ngOnDestroy(): void {
    if (typeof this.sub !== 'undefined') {
      this.sub.unsubscribe();
    }
  }

}
