/**
 * @Description : 文件上传的,通用service
 * @date : 16/8/28 下午2:01
 * @author : keryHu keryhu@hotmail.com
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Headers} from "@angular/http";


import {TokenService} from "../../../../core";

@Injectable()

export class UploadService{

  constructor(private tokenService:TokenService){}


  upload(url:string,file:File):Observable<{complate:number,progress?:number,data?:Object}>{

    return Observable.create(observer => {
      const formData:FormData = new FormData(),
        xhr:XMLHttpRequest = new XMLHttpRequest();
      formData.append('uploadfile', file);

      //增加这个的原因是,文件上传需要手动加 csrf token

      formData.append("_csrf", this.tokenService.getCsrf());
      xhr.open('POST',url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next({complate:1,progress:100,data:JSON.parse(xhr.response)});
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        observer.next({complate:0,progress:Math.round(event.loaded / event.total * 100)});
      };


      const headers=new Headers();
      let token: string = localStorage.getItem('access-token');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    }).share();
  }







  //检查上传文件的格式是否符合要求,要求是 jpg,png,gif 四种,其他的都不符合要求。
  isImg(type:string):boolean{

    const m:Array<string>=['jpg','jpeg','png','gif'];
    // 取出 除了'image/' 后的字符串

    let last:string=type.substring(6).toLowerCase();
    return m.some(e=>e===last);

  }



}
