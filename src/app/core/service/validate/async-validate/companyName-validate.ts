
/**
 * @Description : please enter the description
 * @date : 2016/10/4 下午10:30
 * @author : keryHu keryhu@hotmail.com
 */


import {AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";


import {StringValidate} from "../boolean-validate";
import {UserQueryService} from "../../query";

//远程查询公司名字是否存在。

export class CompanyNameValidate {

  static validator(userQueryService:UserQueryService){

    return (control: AbstractControl)=>{

      //这个用于 会员新建公司的时候，验证

      return new Observable((obs: any) => {
        control.valueChanges.debounceTime(300)
          .distinctUntilChanged()
          .filter(e=>StringValidate.companyName(e))
          .switchMap(e=>userQueryService.companyNameExist(e))
          .subscribe(e=> {
            if (e) {
              obs.next({'companyNameExist': true});
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
