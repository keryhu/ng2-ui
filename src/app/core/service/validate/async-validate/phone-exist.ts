


/**
 *
 * @Description : 用于用户注册的时候,如果手机号已经存在则报错。
 * @date : 16/7/16 上午9:40
 * @author : keryHu keryhu@hotmail.com
 */

import {Observable} from "rxjs/Rx";
import {AbstractControl} from "@angular/forms";


import {UserQueryService} from "../../query";
import {StringValidate} from "../boolean-validate";


export class PhoneExist{

  static validator(userQueryService:UserQueryService){

    return (control: AbstractControl)=>{
      return new Observable((obs:any) => {
        control.valueChanges.debounceTime(300)
          .distinctUntilChanged()
          .filter(e=>StringValidate.phone(e))
          .switchMap(e=>userQueryService.phoneExist(e))
          .subscribe(e=> {
            if (e) {
              obs.next({'phoneExist': true});
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

