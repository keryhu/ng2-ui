/**
 * @Description :
 *
 * 为了区分是否只读，还是部分只读，还是全部只读，从前台传递参数来区分。
 * 【first,edit,allRead,check】,分这 四种情况，
 * 如果是first，那么就是除了管理员姓名，全部可编辑。
 * 2 如果是edit，那么就是部分可编辑，根据传递过来的 具体的可编辑的 key 名字决定，其他的只读。
 *    这个是在新地点的人员审核完，拒绝申请，申请的人员在次查看的情况下发生
 * 3 如果是allRead，那么就是所有的都是只读。 申请人，申请人再次查看已提交的信息的情况下发生
 *
 *
 *
 *
 * 特殊的地方：  管理员姓名，只有在 CompanyType.First中，才从localStorage中获取，其他情况都是从前台传入
 * @date : 2016/10/11 上午10:13
 * @author : keryHu keryhu@hotmail.com
 */


export enum CheckCompanyType {First, Edit, AllRead}

// read 代表，此属性只能读，而且必需传递value进去，，
// write，表示已经有value，现在你必需更改value
export enum CheckCompanyReadWrite{Read, Write}

// check-company-edit company 某一个组件，例如公司名字，地址，都有最基本的属性，
//  例如是否是只读的，是否是edit，如果是edit，是否有reject信息。
export interface CheckCompanyItem {
  // 传递给此item 的value，
  value: string;
  readWrite: CheckCompanyReadWrite;
  // 如果此item是write，证明他是审核拒绝后的材料，则必需含有reject
  rejectMsg?: string;


}

