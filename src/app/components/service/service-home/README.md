新地点的客服人员或管理人员的首页。
、目前增加了一个搜索  公司和 会员的 功能。

1 客服，
  如果搜索会员
     只有input，输入关键字查询
  
  如果搜索公司
     只有input，输入关键字查询（其中搜索未审核的所有公司，在公司审核的页面提供）




2 管理员：

  如果搜索的是会员：
      搜索的条件：  注册时间段，最近登录时间段，，input，不需要单独设置，按钮权限，因为这个可以
      通过 调整 时间段来实现，暂时不实现

  
  
  如果搜索的是公司：
      搜索的条件：  注册时间段，，input


======
通过 local  replaceState ，no reload 页面，刷新 url 参数。。
通过 child component event 传递给前台。service home

通过this.route.snapshot.queryParams  获取url query param 的对象。

通过@input，传递给 child component 。

刷新页面，能够更新此 查询参数。
