/**
 * @Description : please enter the description
 * @date : 16/8/18 下午8:21
 * @author : keryHu keryhu@hotmail.com
 */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Subscription, BehaviorSubject} from "rxjs";



import {AuthService,SpinnerService,StringFormat,RoleEnum,UserQueryService,
  UsernameValidate} from "../../core";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{

  private _ipBlock: boolean = false;
  private blockMsg: string;
  private _afterLoginMsg = new BehaviorSubject('');
  private loginForm: FormGroup;
  private loginSub: Subscription;




  //当点击登录按钮后，跳出来的 显示等待的图标
  private afterLoggedLoading: boolean = false;


  private username = new FormControl('', [Validators.required,
      this.stringFormat.emailOrPhone],//异步验证必须单独分开一个数组,多个状态可以合并到一个数组里。
    [UsernameValidate.validator(this.userQueryService)]);

  private password = new FormControl('', [Validators.required,
    this.stringFormat.passwordInSize,
    this.stringFormat.passwordContainsTwoTypes]);

  constructor(private authService: AuthService, private router: Router,
              private route: ActivatedRoute,
              private titileService: Title, private stringFormat: StringFormat,
              private userQueryService:UserQueryService, private spinner: SpinnerService,
              private fb: FormBuilder) {
  }

  //如果用户没有登录,被动转到login页面,没有必要出现提示语句"请先登录",,因为感觉 比较啰嗦

  ngOnInit() {
    this.spinner.stop();
    this.buildForm();

    this.setTitle();

    this._ipBlock = this.route.snapshot.data['block'].blockStatus;
    this.blockMsg = this.route.snapshot.data['block'].msg;

  }


  public setTitle() {
    this.titileService.setTitle('新地点登录页面');
  }


  buildForm(): void {

    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password
    });

  }

  getIPBlock() {
    return this._ipBlock;
  }


  getAfterLoginMsg() {
    return this._afterLoginMsg;

  }

  onSubmit(data) {

    this.afterLoggedLoading = true;

    this.loginSub = this.authService.login(data.username, data.password)
      .subscribe(
        r=> {
          if (r) {
            //如果之前存储了试图访问的url, 那么就导航到此url
            if (this.authService.redirectUrl) {
              this.router.navigate([this.authService.redirectUrl]);
            }
            else {
              const roles = [RoleEnum.ROLE_XDIDIAN_ADMIN, RoleEnum.ROLE_XDIDIAN_SERVICE];

              if (this.authService.hasAnyRole(roles)) {
                this.router.navigate(['service/home'])
              }
              else {
                this.router.navigate(['/profile/home']);
              }
            }
          }
        },
        err=> {
          localStorage.removeItem('access-token');
          //如果返回的是 resendToken,那么取出2个token的value
          if (err.includes('resendToken')) {
            const m = JSON.parse(err);
            //转到email激活的页面。
            this.router.navigate(['/email-activate'], {
              queryParams: {
                email: m.email, resendToken: m.resendToken, resignupToken: m.resignupToken
              }
            })

          }

          else if (err === 'tokenExpired') {
            this.router.navigate(['/signup']);
          }
          this.afterLoggedLoading = false;
          console.log(err);
          this._afterLoginMsg.next(err);
        }
      )
  }




  ngOnDestroy() {
    if (typeof this.loginSub !== 'undefined') {
      this.loginSub.unsubscribe();
    }
  }

}
