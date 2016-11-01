/**
 * @Description : please enter the description
 * @date : 16/8/27 下午4:18
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable}   from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot, Router} from "@angular/router";


import {TokenObj} from "../../../core";
import {PersonalSetService} from "./personal-set.service";
import {PersonalEditInfo} from "./personal-set.component";





@Injectable()

export class PersonalSetResolve implements Resolve<any>{

  constructor(private router: Router,private personalSetService: PersonalSetService){}

  resolve(route: ActivatedRouteSnapshot): Observable<PersonalEditInfo>|any{
    const info:TokenObj=JSON.parse(localStorage.getItem('token'));
    return this.personalSetService.getInfo(info.userId)
      .map(e=>{
        let n:PersonalEditInfo={
          userId:e.userId,
          name:e.name,
          email:e.email,
          phone:e.phone,
          birthday:e.birthday,
          headerBase64:e.header?`data:image/png;base64,${e.header}`:undefined,
          useDefaultHeaderImg:e.useDefaultHeaderImg,
          nameCanModify:e.nameCanModify,
          nameModifyTime:e.nameModifyTime?e.nameModifyTime:''
        };


        return n;
      },
      err=>{
        this.router.navigate(['login']);
      })
  }

}
