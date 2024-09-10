/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-08-22 21:03:24
 * @LastEditTime: 2024-09-09 13:43:37
 * @Description: 系统返回代码，需要和后端统一
 */
export enum SystemCode {
  AccessDenied = 502,
  AccessTokenError = 400,
  AuthError = 402,
  BizError = 503,
  InnerError = 500,
  MissQuery = 504,
  NoResource = 505,
  OK = 200,
  ParameterValidError = 501,
  UNAUTHORIZED = 401,
}

export const SystemCodeMessage: { [key in SystemCode]: string } = {
  [SystemCode.AccessDenied]: '用户没有权限访问',
  [SystemCode.AccessTokenError]: '用户登录令牌失效',
  [SystemCode.AuthError]: '用户名或密码错误',
  [SystemCode.BizError]: '业务逻辑错误',
  [SystemCode.InnerError]: '系统内部错误',
  [SystemCode.MissQuery]: '缺少必要参数',
  [SystemCode.NoResource]: '没有找到该URL',
  [SystemCode.OK]: 'success',
  [SystemCode.ParameterValidError]: '参数验证错误',
  [SystemCode.UNAUTHORIZED]: '用户未登录',
};
