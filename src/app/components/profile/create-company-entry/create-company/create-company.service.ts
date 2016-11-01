/**
 * @Description : please enter the description
 * @date : 16/9/12 下午6:18
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {Response, Http, Headers, ResponseOptions, ResponseType} from "@angular/http";
import {Observable, Observer} from "rxjs";
import {isPresent} from "@angular/core/src/facade/lang";
import {getResponseURL, isSuccess} from "@angular/http/src/http_utils";


import {RequestService,TokenService} from "../../../../core";
import {Constant} from "../../../../core/service/util/constant";




@Injectable()

export class CreateCompanyService {

  constructor(private http: Http, private request: RequestService,
              private tokenService: TokenService) {
  }

  /**
   * 当打开  新建 公司帐户 页面的时候，，首先需要 加载 3个信息数据
   * 1  所有的 省市，直辖市的 数据
   * 2  所有的公司行业数据
   * 3  所有的公司性质数据
   * @return
   */

  getResolveInfo() {
    const url = Constant.createCompanyResolveUrl;

    return this.http.get(url, this.request.getAuthOptions())
      .map((res: Response)=> {
        return res.json()
      })
      .catch(this.request.defaultHandlerError);
  }

  /**
   * postJsonAndFiles(data) {
    const url = '/api/company-info/company/newCompany';

    return this.http.post(url, JSON.stringify(data),
      {headers: this.request.getAuthHeaders()})
      .map(res=>res.json())
      .catch(this.request.defaultHandlerError);


  }

   *
   *
   * @param data
   * @returns {any}
   */



  public submit(body: string, businessLicense: File, intruduction: File) {
    const url = Constant.createCompanyUrl;
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


  //convert name to companyIndustry

  public convertNameToCompanyIndustry(name: string): string {

    let result: string;
    switch (name) {
      case '':
        result = '';
        break;
      default:
        break;
    }

    return result;

  }


  // convert name to enterpriseNature

  public convertNameToEnterpriseNature(name: string) {

  }

}
