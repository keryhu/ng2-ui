/**
 * @Description : please enter the description
 * @date : 2016/10/11 上午11:58
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Response, Headers, ResponseOptions, ResponseType} from "@angular/http";
import {Observable, Observer} from "rxjs";
import {isPresent} from "@angular/core/src/facade/lang";
import {getResponseURL, isSuccess} from "@angular/http/src/http_utils";

import {TokenService} from "../../../../core";



@Injectable()
export class UncheckCompanyService {


  constructor(private tokenService: TokenService) {

  }

  public submit(body: string, url:string,businessLicense: File, intruduction: File) {
    //const url = '/api/company-info/company/newCompany';
    return new Observable((responseObserver: Observer<any>) => {
      //http://stackoverflow.com/questions/21329426/spring-mvc-multipart-request-with-json/25183266#25183266

      let formdata = new FormData();

      formdata.append("_csrf", this.tokenService.getCsrf());
      formdata.append("businessLicense", businessLicense);
      formdata.append("intruduction", intruduction);
      formdata.append("body", new Blob([body], {type: "application/json"}));

      let request = new XMLHttpRequest();
      request.onload = () => {

        const body = isPresent(request.response) ? request.response : request.responseText;

        const headers = Headers.fromResponseHeaderString(request.getAllResponseHeaders());

        const url = getResponseURL(request);

        let status: number = request.status === 1223 ? 204 : request.status;
        if (status === 0) {
          status = body ? 200 : 0;
        }

        const responseOptions = new ResponseOptions({body, status, headers, url});
        const response = new Response(responseOptions);

        if (isSuccess(status)) {
          responseObserver.next(response);
          responseObserver.complete();
          return;
        }
        responseObserver.error(response);
      };

      request.onerror = (err: any) => {
        const responseOptions = new ResponseOptions({body: err, type: ResponseType.Error});
        responseObserver.error(new Response(responseOptions));
      };

      request.open("POST", url, true);
      const token: string = localStorage.getItem('access-token');
      request.setRequestHeader('Authorization', `Bearer ${token}`);
      request.send(formdata);

    });
  }



}
