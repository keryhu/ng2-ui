自定义的 整合的  search-page  组件

功能：

  前台传递参数，
  
     搜索后台的 serverUrl， 刷新浏览器的indexurl，查询参数 object类型，（key，value）
     
     component，预留一个 input 搜索 -当有新的饿搜索参数时，加到里面来，
     
     现在在table里面的 title 属性名字，array，由  name，sort组成
     定义一个对象，属性name，sort，-boolean
     
     是否需要input搜索框-boolean
     
     
  component对外传递的事件
  
     pageChange 事件，刷新本身的url，（不对外产地，内部完成刷新功能）
     input  内容变更，传递外部事件，刷新url
     
     
组成：

  input  buuton（search）  table  pagination
  
如何配置：

例子：
<app-search-page [showSearchInput]="selectedtSearchType&&selectedtSearchType!='未选择'"
                 [placeholder]="placeholdContent" [indexUrl]="indexUrl"
                 [searchParams]="submitedObject" [serverUrl]="searchUserServerUrl"
                 [dataTitle]="userTableTitle">

</app-search-page>


placeholder---input 的placeholder 动态设置。
indexUrl   -- 当浏览器url，地址，查询参数之前的
searchParams--  所需要查询的参数
serverUrl   --  后台查询的地址
dataTitle----   data table title 的名字，是否包含有sort，sort的默认设置。

     
     
     checkbox ,是否需要，以后再改，目前无法确定做法，需要多个需求确定
     还有点击某一行，促发什么事件，暂时空缺，因为dialog，还有bug
