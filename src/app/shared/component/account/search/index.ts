/**
 * @Description : please enter the description
 * @date : 2016/10/14 下午9:58
 * @author : keryHu keryhu@hotmail.com
 */



import {SearchInputModule} from "./search-input";
import {SearchUserDetailedModule,SearchCompanyDetailedModule} from "./search-detailed";


export * from './search-input';
export * from './search-detailed';
export * from './search.interface';
export * from './sort';

// 将searchModle 下面的modles 组合起来一起。
export const SearchModules=[SearchInputModule,SearchUserDetailedModule,
  SearchCompanyDetailedModule,
];
