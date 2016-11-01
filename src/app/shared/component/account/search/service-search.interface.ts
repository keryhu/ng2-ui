
/**
 * @Description : please enter the description
 * @date : 2016/10/22 下午1:03
 * @author : keryHu keryhu@hotmail.com
 */


import {Sort} from "./sort";

//新地点的客服人员，或者管理人员搜索公司或者会员，提交的 搜索的 参数
export interface ServiceSearchContent{
  searchType?:string;              // company or user
  registerTimeBegin?:string;   //use moment.js  string iso.date
  registerTimeEnd?:string;
  lastLoginTimeBegin?:string;
  lastLoginTimeEnd?:string;
  content?:string;                      // input content
  page?:number;                    // 第一页，为0，后面自动加1
  size?:string;
  sort?:Array<Sort>;

}
