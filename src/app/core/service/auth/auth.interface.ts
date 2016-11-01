/**
 * @Description : please enter the description
 * @date : 2016/10/12 下午9:02
 * @author : keryHu keryhu@hotmail.com
 */

//用在 refresh token的时候。

export interface RefreshToken{
  userId:string;
  refreshToken:string;

}


// 用户的权限

export const RoleEnum={
  ROLE_DEFAULT:'ROLE_DEFAULT',                  //默认权限,无业人员,在公司上班但是,处于团队最底层的人员
  ROLE_COMPANY_ADMIN:'ROLE_COMPANY_ADMIN',            //客户 公司平台的admin,拥有客户平台的最高权限
  ROLE_XDIDIAN_ADMIN:'ROLE_XDIDIAN_ADMIN',            // 新地点,产品制造商管理员权限,整套软件的最高权限
  ROLE_XDIDIAN_SERVICE:'ROLE_XDIDIAN_SERVICE',          // 新地点,产品制造商客服人员。
  ROLE_SOME_DEPARTMENT:'ROLE_SOME_DEPARTMENT'           // 拥有所在部门的最高权限,可以读整个部门的所有信息。
}


//保存在local storage 中的信息 token
export interface TokenObj{
  loginName:string;
  userId:string;
  refreshToken_expires_in:number;
  name?:string;      //用户姓名


}



