

/**
 * @Description : 查看当前的ip有没有被封,如果被封,就显示在登录页面
 * @date : 16/8/18 下午8:41
 * @author : keryHu keryhu@hotmail.com
 */


import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";


import {Constant} from "../../core";


@Injectable()
export class IpBlockStatus{
    private url=Constant.ipBlockUrl;
    constructor(private http:Http){}

    query():Observable<any>{
        return this.http.get(this.url)
            .map(e=>e.json())
            ;
    }

}
