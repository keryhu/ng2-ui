/**
 * @Description : 常量设置
 * @date : 16/6/20 下午5:52
 * @author : keryHu keryhu@hotmail.com
 */

import { Injectable } from '@angular/core';
import {hostname} from "os";

@Injectable()
export class Constant{

  constructor(){

  }


  public static refreshTokenSaveUrl:string='/api/storeRefreshToken';
  public static refreshTokenGetUrl:string='/api/getRefreshToken';
  public static authUrl: string=`http://${hostname()}:9999/uaa/oauth/token`;
  //下面这个地址bu xing
  //public static authUrl: string='/api/auth-server/uaa/oauth/token';
  // 修改名字的时候,提交后台,查看是否可以修改名字or 保存的post url
  public static validateNameCanModifyOrSaveUrl:string='/api/user/users/edit/name';

  //用户修改生日的时候,后台的post url
  public static editBirthdayUrl:string='/api/user/users/edit/birthday';

  //用户修改email或phone的时候,后台的post url
  public static accountEditUrl:string='/api/account-activate/accountActivate/edit';


  //获取个人信息的 url
  public static getPersonalEditInfoUrl:string='/api/user/users/edit/info';
  public static accountActivateClickUrl:string='/api/account-activate/accountActivate/';


  // 新地点的客人人员 查询会员，返回的是 pagination 分页形式
  public static serviceQueryUserWithPage:string='/api/user/service/queryWithPage';

  public static adminQueryUserWithPage:string='/api/user/admin/queryWithPage';

  //user query url

  public static emailExistQueryUrl:string='/api/user/users/query/isEmailExist';
  public static phoneExistQueryUrl:string='/api/user/users/query/isPhoneExist';
  public static accountExistQueryUrl:string='/api/user/users/query/isLoginNameExist';
  public static companyNameExistQueryUrl:string=
    '/api/company/company/findCompanyExistByName';
  public static emailStatusQueryUrl:string='/api/user/users/query/emailStatus';


  //address url
  public static getProvincesUrl:string='/api/company/address/provinces';
  public static getCitiesUrl:string='/api/company/address/cities';
  public static getCountiesUrl:string='/api/company/address/counties';


  //side menu url
  public static getMenusUrl:string='/api/menu/query/menus';

  //login
  public static ipBlockUrl:string='/api/auth-server/uaa/query/blockStatus';

  //signup
  public static signupUrl:string='/api/signup/signup';

  //recover
  public static recoverInputAccountUrl:string=
    '/api/user/users/query/getEmailAndPhone';

  public static recoverCheckMethodUrl:string=
    '/api/account-activate/accountActivate/recover/checkMethod';

  public static recoverAccountAndTokenMatchUrl:string=
    '/api/account-activate/accountActivate/recover/isAccountAndTokenExist';

  public static recoverNewPassword:string=
    '/api/account-activate/accountActivate/recover/newpassword';

  //personal-edit
  public static personalEditHeaderImgUrl='/api/user/users/personalInfo/uploadHeader';
  public static changePasswordUrl='/api/user/users/edit/password';

  public static clientId:string='kksdi2388wmkwe';
  public static clientSecret:string='kksd23isdmsisdi2';

  // create company
  public static createCompanyUrl='/api/company/company/createCompany';
  public static getCheckCompanyCommonInfoUrl='/api/company/company/getCheckCompanyCommonInfo';
  public static getUnCheckdCompanyUrl=
    '/api/company/company/findUncheckedCompanyBySelf';
  public static getUnCheckdCompanyAfterRejectUrl=
    '/api/company/company/findUncheckedCompanyAfterReject';

  public static createCompanyAfterRejectUrl=
    '/api/company/company/createCompanyAfterReject';

  // 新地点的客服人员，在首页搜索 数据库中的公司信息。
  public static serviceQueryCompanyWithPages=
    '/api/company/service/queryCompanyWithPage';

  public static adminQueryCompanyWithPages=
    '/api/company/admin/queryCompanyWithPage';
  public static findCompanyExistById='/api/company/company/findCompanyExistById';
  public static serviceCheckCompanyPostUrl='/api/company/service/check-company';

  //xdidian  service /admin  url

  public static adminQueryServiceByName='/api/user/admin/queryByName';
  public static adminDelServiceById= '/api/user/admin/delById';
  public static adminAddServiceUrl='/api/user/admin/add-service';

  // check-company-edit company
  public static serviceQueryUncheckdCompanyUrl='/api/company/service/queryUncheckedCompanyWithPage';


  //  新地点的工作人员,进入审核页面后，搜索所有未审核的注册公司，当点击某一个公司详情
  //的时候，通过companyId，来获取他的提交材料de url
  public static serviceQueryNewCompanyInfoByCompanyIdUrl=
    '/api/company/service/queryNewCompanyInfoByCompanyId';

  //refreshToken 过期时间   单位为 秒   10 days
  public static refreshToken_expired_in:number=864000;

  //最小的刷新access-token的剩余时间, 单位为m,设置这个时间⚠️目的是: 提交更新access-token,还有当浏览器刷新的时候,
  //如果发现剩余时间小于这个数字的时候,自动更新access-token
  public static minLeftRefreshTokenSeconds:number=35;
  //access-token 过期时间为 5分钟
  public static accessTokenValiditySeconds:number=300;
  public static emailActivateCountDown:string='emailActivateCountDown';
  //public static emailActivate:string='resend-emailActivate';

  //点击resend一次后的,冷却时间,单位为秒。
  public static clickCoolingSeconds:number=140;


  //鼠标悬浮nodeTree上面
  public static nodeSelected:string='nodeSelected';

  public static recoverCountDown:string='recoverCountDown';
  public static editCountDown:string='editCountDown';



}
