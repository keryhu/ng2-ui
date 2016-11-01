/**
 * @Description : please enter the description
 * @date : 16/8/21 上午10:16
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";

import {StringValidate} from "./boolean-validate";

//下面的 from 后面的地址，不能省约到 /boolean-validate，


@Injectable()
export class StringFormat {
  constructor() {
  }


  email(control: AbstractControl): {[key: string]: any} {
    if (!control.value) {
      return null;
    }
    return StringValidate.email(control.value) ? null : {emailFormat: true};
  }

  phone(control: AbstractControl): {[key: string]: any} {
    if (!control.value) {
      return null;
    }
    return StringValidate.phone(control.value) ? null : {phoneFormat: true};
  }

  //用户名的匹配,由email或者phone组成,否则报错。
  emailOrPhone(control: AbstractControl): {[key: string]: any} {
    if (!control.value) {
      return null;
    }

    //如果既不是email格式,也不是phone格式。那么报错
    const neitherEmailNorPhone = !StringValidate.email(control.value) &&
      !StringValidate.phone(control.value);

    if (neitherEmailNorPhone) {
      return {emailOrPhone: true};
    }
    else {
      return null;
    }
  }

  // 密码必须是6-20位
  passwordInSize(control: AbstractControl): {[key: string]: any} {
    if (!control.value) {
      return null;
    }
    const notInSize = control.value.length < 6 || control.value.length > 20;

    return notInSize ? {shouldInSize: true} : null;

  }


  //密码必须包含两种组合
  passwordContainsTwoTypes(control: AbstractControl): {[key: string]: any} {
    const notInSize = control.value.length < 6 || control.value.length > 20;
    if (!control.value || notInSize) {
      return null;
    }
    return StringValidate.password(control.value) ? null : {containTwoTypes: true};

  }

  companyName(control: AbstractControl): {[key: string]: any} {

    if (!control.value) {
      return null;
    }
    return StringValidate.companyName(control.value) ? null : {companyNameFormat: true};
  }

  peopleName(control: AbstractControl): {[key: string]: any} {

    if (!control.value) {
      return null;
    }
    return StringValidate.peopleName(control.value) ? null : {nameFormate: true};
  }


}
