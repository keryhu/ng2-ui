
/**
 * @Description : please enter the description
 * @date : 2016/11/4 下午1:33
 * @author : keryHu keryhu@hotmail.com
 */

import {CheckCompanyItem} from "./check-company.interface";

// 暴露给外界的，审核公司的时候 ，需要的属性。用在前台将已有的info传递给uncheckcompany component
export interface CheckCompanyObject {

  name: CheckCompanyItem;    // 公司名字
  address: CheckCompanyItem;  //  自定义包含省份，地级市，县的 的address
  fullAddress: CheckCompanyItem  // 详细地址
  companyIndustry: CheckCompanyItem   // 公司行业
  enterpriseNature: CheckCompanyItem   // 公司性质

  // 这里不需要adminName，因为如果新地点的任何审核，也无需查看他的adminName了。
  // 只有审核本人提交的时候，显示下自己的名字，
  businessLicense: CheckCompanyItem   // 营业执照
  intruduction: CheckCompanyItem   // 介绍信


}
