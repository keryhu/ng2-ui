/**
 * @Description : please enter the description
 * @date : 2016/10/16 下午2:48
 * @author : keryHu keryhu@hotmail.com
 */


// 用户搜索，要不必需提供 enum SearchType，要不必需提供  搜索的内容，两者必有一个，其他的都是可选

// 用户搜素的时候，暴露的搜索类型。，是搜索user，还是company,当用户没有提供内容的时候

export enum SearchType{
  notSelected=0,Company,User
}

// 暴露在下拉框中的 名字。
export const allSearchType=['未选择','公司','会员'];

// 用户搜索公司和user，会员数据库的时候，暴露的搜索条件,如果用户搜索的时候，没有提供此参数，则
// 提供单独的 SearchType
export interface SearchParam {

  content: string;

  searchType?: SearchType;
}




