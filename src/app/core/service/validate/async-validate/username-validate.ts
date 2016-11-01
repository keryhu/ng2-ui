/**
 * @Description : please enter the description
 * @date : 2016/10/4 下午10:02
 * @author : keryHu keryhu@hotmail.com
 */


import {AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";


import {UserQueryService} from "../../query";
import {StringValidate} from "../boolean-validate";


//用户登陆的时候,验证用户名。这里只有 异步验证,非异步验证不放在这里

export class UsernameValidate{

  static validator(userQueryService:UserQueryService){
    return (control: AbstractControl)=>{

      //这个用于登录的 时候,验证用户输入的email是否已经注册。如果未注册,则报错。
      if (StringValidate.email(control.value)) {
        return new Observable((obs:any) => {
          control.valueChanges.debounceTime(300)
            .distinctUntilChanged()
            .switchMap(e=>userQueryService.emailExist(e))
            .subscribe(e=> {
              if (!e) {
                obs.next({'emailNotExist': true});
              }
              else {
                obs.next(null);
              }
              obs.complete();
            })

        })
      }

      //用于登录的时候,验证手机号是否已经注册,如果未注册,则报错。
      else if (StringValidate.phone(control.value)) {
        return new Observable((obs:any)=> {
          control.valueChanges.debounceTime(300)
            .distinctUntilChanged()
            .switchMap(e=>userQueryService.phoneExist(e))
            .subscribe(e=> {
              if (!e) {
                obs.next({'phoneNotExist': true});
              }
              else {
                obs.next(null);
              }
              obs.complete();
            })
        })

      }
    }
  }

}
