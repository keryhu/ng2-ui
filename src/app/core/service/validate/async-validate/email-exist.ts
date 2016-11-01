




/**
 * @Description : 用于注册的时候,如果email已经存在了,则报错
 * @date : 16/7/16 上午9:21
 * @author : keryHu keryhu@hotmail.com
 */

//这个用于注册的时候,验证email是否已经存在于数据库


import {Observable} from "rxjs/Rx";
import {AbstractControl} from "@angular/forms";


import {UserQueryService} from "../../query";
import {StringValidate} from "../boolean-validate";




export class EmailExist{


    static validator(userQueryService:UserQueryService){

      return (control: AbstractControl)=>{
        return new Observable((obs:any) => {
          control.valueChanges.debounceTime(300)
            .distinctUntilChanged()
            .filter(e=>StringValidate.email(e))
            .switchMap(e=>userQueryService.emailExist(e))
            .subscribe(e=> {
              if(e){
                obs.next({'emailExist': true});
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




