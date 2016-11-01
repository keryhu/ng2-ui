/**
 * @Description : email 激活的 component
 * @date : 16/8/22 下午9:53
 * @author : keryHu keryhu@hotmail.com
 */


import {Component, OnInit, OnDestroy} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Router, ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs";
import {Constant,SpinnerService,CountStart, CountdownService} from "../../core";
import {ViewChild} from "@angular/core/src/metadata/di";
import {AccountActivateComponent} from "../../shared/component/account/account-activate/account-activate.component";



@Component({
  selector: 'app-email-activate',
  templateUrl: './email-activate.component.html',
  styleUrls: ['./email-activate.component.css']
})
export class EmailActivateComponent implements OnInit,OnDestroy  {


  //使用的是哪种情景,注册,edit,还是recover
  private applySituation:string='SIGNUP';
  private itemName:string=Constant.emailActivateCountDown;
  private tokenExiredUrl: string='signup';   //当验证码过期,需要导航到的页面

  private paramsSub: Subscription;
  private urlParams:Object;


  constructor(private titleService: Title,private router: Router,
              private route: ActivatedRoute,private spinner: SpinnerService,
              private countdownService: CountdownService) {}

  ngOnInit() {
    this.spinner.stop();
    //初始化的判断,如果email已经激活,那么直接转到login页面。
    this.setTitle();
    this.getParam();


  }

  @ViewChild(AccountActivateComponent)
  private accountActivateComponent: AccountActivateComponent;

  getParam() {
    //注意使用查询参数。routerState.queryParams
    this.paramsSub = this.route.queryParams.subscribe(
      params=> {
        this.urlParams = {
          account: params['email'],
          resendToken: params['resendToken'],
          resignupToken: params['resignupToken'],
          applySituation: this.applySituation
        };
        console.log(typeof params['first']=='string' );
        if(params['first']=='true'){

          const q: CountStart = {
            name: Constant.emailActivateCountDown,
            time: Constant.clickCoolingSeconds
          };
          this.accountActivateComponent.startCoundown(q);

          // 刷新页面，且移除了first 参数
          const t = {
            email: this.urlParams['account'],
            resendToken: this.urlParams['resendToken'],
            resignupToken: this.urlParams['resignupToken'],
            applySituation: this.applySituation
          };
          this.router.navigate(['/email-activate'], {
            queryParams: t
          });
        }
      }
    )
  }


  cancel(status:boolean){
    if(status){
      this.router.navigate(['login']);
    }
  }

  resendSuccess(obj:any){
    if(typeof obj=='object'&&obj.hasOwnProperty('email')){
      //转到email激活的页面。
      this.router.navigate(['/email-activate'], {
        queryParams: obj
      });
    }
  }

  setTitle() {
    this.titleService.setTitle('新地点电子邮箱激活确认页面');
  }


  ngOnDestroy() {
    if (typeof this.paramsSub!=='undefined') {
      this.paramsSub.unsubscribe();
    }
  }

}
