/**
 * @Description : please enter the description
 * @date : 2016/10/11 上午11:58
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";
import {Response, Headers, ResponseOptions, ResponseType, Http, URLSearchParams} from "@angular/http";
import {Observable, Observer} from "rxjs";
import {isPresent} from "@angular/core/src/facade/lang";
import {getResponseURL, isSuccess} from "@angular/http/src/http_utils";

import {TokenService,RequestService,Constant} from "../../../../core";



@Injectable()
export class CheckCompanyTemplateService {


  constructor(private tokenService: TokenService,
              private http: Http, private request: RequestService) {

  }

  /**
   * 当打开  新建 公司帐户 页面的时候，，首先需要 加载 3个信息数据
   * 1  所有的 省市，直辖市的 数据
   * 2  所有的公司行业数据
   * 3  所有的公司性质数据
   * 4  参数companyId，可选，如果提供了，表示是公司注册申请人，在新建公司或者查看公司已经注册信息
   *    或者查看被拒绝的信息。，如果是新地点的工作人员，则是需要提供 companyId，来获取上面信息
   *    该companyId，有没有被注册过，没有情况是被拒绝，还是新申请。
   * @return
   */

  public getCheckCompanyCommonInfo(companyId?:string){
    const url = Constant.getCheckCompanyCommonInfoUrl;
    let params = new URLSearchParams();

    if(companyId){
      params.set('companyId',companyId);
    }

    return this.http.get(url, this.request.getAuthOptions(params))
      .map((res: Response)=> {
        return res.json()
      })
      .catch(this.request.defaultHandlerError);


  }


  public submit(data: Object,address:Observable<string>,url:string,businessLicense: File, intruduction: File){

    return address.switchMap(e=>{
      data['address']=e;
      const m= JSON.stringify(data);
      return this.secondSubmit(m,url,businessLicense,intruduction);
    })
  }



  public secondSubmit(body: string, url:string,businessLicense: File, intruduction: File) {
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
