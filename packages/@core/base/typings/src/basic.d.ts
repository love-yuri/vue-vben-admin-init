/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-07 21:03:54
 * @LastEditTime: 2024-09-09 13:25:04
 * @Description:
 */
interface BasicOption {
  label: string;
  value: string;
}

type SelectOption = BasicOption;

type TabOption = BasicOption;

interface BasicUserInfo {
  /**
   * 用户角色
   */
  roles?: string[];

  /**
   * 用户名
   */
  username: string;
}

export type { BasicOption, BasicUserInfo, SelectOption, TabOption };
