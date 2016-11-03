这个组件，是包含了 未审核的公司的 视图组件

视图，可以只读，或者编辑状态。由外部传入参数。

用在，
1 会员已经提交了公司注册的申请，但是还未审核通过，或者审核被拒绝了，事后查看--用户可以自行编辑。
2 会员在申请公司的时候，提交注册信息的时候，表格。
3 新地点的客服人员，或管理人员，审核公司的时候，需要用到。

如何配置

<app-uncheck-company [companyType]="companyType"  [companyInfo]="waitCheckResolveInfo">
 
</app-uncheck-company>


companyType 是CompanyType  enum  {First, Edit, AllRead};

first 代表，第一次注册时候，使用
edit  代表，是地点的工作人员审核的时候，
AllRead  表示 所有内容都是无法修改的，用在会员注册后，查看已经提交的材料，
          或者新地点的工作任何审核后，如果已经拒绝了申请，，会员查看拒绝的审核的时候出现
