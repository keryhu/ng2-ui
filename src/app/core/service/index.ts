/**
 * @Description : please enter the description
 * @date : 2016/10/12 下午9:33
 * @author : keryHu keryhu@hotmail.com
 */


import {AuthService} from "./auth/auth.service";
import {
  AuthenticatedGuard, CompanyAdminGuard, DefaultGuard, SomeDepartmentGuard,
  UnauthenticatedGuard, XdidianAdminGuard, XdidianServiceGuard, OnlyCustomerGuard
} from "./guard";

export * from './auth';
export * from './util';
export * from './guard';
export * from './query';
export * from './validate';

export const AuthProviders = [
  AuthService,
  AuthenticatedGuard,
  CompanyAdminGuard,
  DefaultGuard,
  SomeDepartmentGuard,
  UnauthenticatedGuard,
  XdidianAdminGuard,
  XdidianServiceGuard,
  OnlyCustomerGuard

];
