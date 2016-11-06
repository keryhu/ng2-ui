这个组件，是包含了 未审核的公司的 视图组件

视图，可以只读，或者编辑状态。由外部传入参数。

用在，
1 会员已经提交了公司注册的申请，但是还未审核通过，或者审核被拒绝了，事后查看--用户可以自行编辑。
2 会员在申请公司的时候，提交注册信息的时候，表格。
3 新地点的客服人员，或管理人员，审核公司的时候，需要用到。

如何配置



CheckCompanyType 是 {First, Edit, AllRead};  

first 代表，第一次注册时候，使用 ，
edit  代表，是新地点审核完资料，拒绝了申请，申请人再次查看资料时候，需要修改reject使用，
AllRead  表示 所有内容都是无法修改的，用在会员注册后，查看已经提交的材料，
          或者新地点的工作任何审核时，出现


新地点的工作人员如何审核提交的材料，那么就是在只读的信息下面，加上选择框，针对提交信息
进行平均，那么这个就可以放在  check-company页面，而不在这里


CheckCompanyReadWrite   {Read, Write} 表示此item是只读，还是可以编辑，
   可编辑的情况下，需要先将value传递进来。
   
   
CheckCompanyObject 

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



如何配置：

 <app-check-company-template [checkCompanyType]="checkCompanyType"
                              [companyInfo]="waitCheckResolveInfo"
                              [urlResolveName]="urlResolveName"
                               [submitUrl]="url">
  </app-check-company-template>
  
  checkCompanyType  传递是  first，edit，还是 readAll
  
  companyInfo，从后台获取company注册信息
  
  submitUrl  新注册时候，提交后台保存的url
  
  urlResolveName ，通过这个获取行业和公司性质的后台数据。他是一个resolve name
  
  

}
