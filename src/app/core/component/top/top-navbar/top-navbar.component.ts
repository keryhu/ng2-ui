import {
  Component, OnInit, Output, EventEmitter

} from '@angular/core';
import {AuthService, RoleEnum} from "../../../service";



@Component({
  selector: 'app-top-navbar',
  templateUrl: 'top-navbar.component.html',
  styleUrls: ['top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {


  //登录后，显示的首页名字。
  private afterLoggedIndex: string;

  //登录后，显示的首页url。
  private afterLoggedUrl: string;

  private showSearchBar: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    if (this.authService.isLoggedIn) {
      const roles = [RoleEnum.ROLE_XDIDIAN_ADMIN, RoleEnum.ROLE_XDIDIAN_SERVICE];

      if (this.authService.hasAnyRole(roles)) {
        this.afterLoggedUrl = '/service/home';
        this.afterLoggedIndex = '客服首页';
      }
      else {
        this.afterLoggedUrl = '/profile/home';
        this.afterLoggedIndex = '会员首页';
      }
    }
  }


  @Output() toggleMenuIcon = new EventEmitter<boolean>();

  //异步查看当前用户有没有登录
  getLoggedIn() {
    return this.authService.getLoggedIn();
  }

  // 用户点击 "menu icon " 事件
  toggle() {
    this.toggleMenuIcon.emit(true);
  }


  //检测当前用户是否，是新地点的 客服人员或者是 管理员
  isXdidianStaff(): boolean {
    return this.authService.hasAnyRole([
      RoleEnum.ROLE_XDIDIAN_ADMIN, RoleEnum.ROLE_XDIDIAN_SERVICE]);

  }

  // 点击搜索的icon 事件
  clickSearch(): void {
    this.showSearchBar = true;
  }

  // 点击 关闭搜索的icon 事件

  /**
   *
   *  closeSearch(){
    this.showSearchBar=false;
  }
   */


  logout() {
    this.authService.logout();
    return false;
  }
}
