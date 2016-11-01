import { Injectable } from '@angular/core';


/**
 * 验证输入的字符串是哪种格式，email。phone。password，companyName或peopleName
 */


export class StringValidate {

  constructor() { }

  static  email(email:string):boolean{
    const EMAIL_REG = /^\w[-.\w]*\@[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)*\.(com|cn|net|edu|info|xyz|wang|org|top|ren|club|pub|rocks|band|market|software|social|lawyer|engineer|me|tv|cc|co|biz|mobi|name|asia)$/i;
    const result = EMAIL_REG.test(email);
    return result;
  }


  static phone(phone:string):boolean{
    const PHONE_REG = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    const result = PHONE_REG.test(phone);
    return result;
  }

  //6-20位包含字母,数字,特殊字符任两种。
  static password(password:string):boolean{
    const PASSWORD_REG = /^(?=.*\d)(?=.*[A-Za-z]).{6,20}|(?=.*\d)(?=.*[-`=;',.~!@#$%^&*()_+\\{}:<>?]).{6,20}|(?=.*[A-Za-z])(?=.*[-`=;',.~!@#$%^&*()_+\\{}:<>?]).{6,20}|(?=.*\d)(?=.*[A-Za-z])(?=.*[-`=;',.~!@#$%^&*()_+\\{}:<>?]).{6,20}$/;
    const result = PASSWORD_REG.test(password);
    return result;
  }

  //包含中文或字母的4-40个,可以包含 括号
  static companyName(name:string):boolean{
    const NAME_REG = /^([-a-zA-Z\u4e00-\u9fa5\(\)（）_\.\s]{4,40})$/;
    const result = NAME_REG.test(name);
    return result;
  }

  //姓名匹配,只能由2-20个字母或中文,不能有数字和括号。
  static peopleName(name:string):boolean{
    const PEOPLE_NAME = /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z\.\s]{2,20})$/;
    const result = PEOPLE_NAME.test(name);
    return result;
  }

  // 验证是否含有 特殊字符，用在搜索 公司，会员，
  static specialCharacter(v:string):boolean{

    const SC=/[`~!#\$%\^\&\*\+<>\?:"\{\},\\\/;'\[\]]/ig;
    const result =SC.test(v);
    return result;

  }


}
