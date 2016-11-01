/**
 * @Description :
 *
 * 为了区分是否只读，还是部分只读，还是全部只读，从前台传递参数来区分。
 * 【first,edit,allRead】,分这三种情况，
 * 如果是first，那么就是除了管理员姓名，全部可编辑。
 * 2 如果是edit，那么就是部分可编辑，根据传递过来的 具体的可编辑的 key 名字决定，其他的只读。
 * 3 如果是allRead，那么就是所有的都是只读。
 *
 *
 * 特殊的地方：  管理员姓名，只有在 CompanyType.First中，才从localStorage中获取，其他情况都是从前台传入
 * @date : 2016/10/11 上午10:13
 * @author : keryHu keryhu@hotmail.com
 */



export enum CompanyType {First, Edit, AllRead};
