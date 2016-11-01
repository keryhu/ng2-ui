search-input   输入框的设计
search—table   输入显示表格（简约数据）
search-detailed 点击输入显示表格某一行，显示详细信息--包含一个service，获取page data

search-table 是 search-detailed 父级，
search-input  是search-table 的父级，




search-detailed 是一个最基本的组件，外部传递数据进来，显示搜索的某一行的详细结果

需要传递的参数，根据userId  或 companyId，从search-service 获取obserable，数据，
  根据user／company 详细信息的interface，显示详细信息，并且排版。
  
  
查看的人群，新地点的客服，新地点的管理人员。

 因为user和company 需要显示的表格属性不一样，所以设计2个不同的组件。
