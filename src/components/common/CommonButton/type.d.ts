/**
 * props类型校验
 */
export interface Props {

  /**
   * 开放能力
   */
  openType: 'getUserInfo' | 'getPhoneNumber' | 'share' | 'contact' | 'launchApp' | 'openSetting' | 'feedback'

  /**
   * 获取用户信息
   */
  onGetUserInfo?: (...args: any[]) => any

  /**
   * 获取用户电话号码
   */
  onGetPhoneNumber?: (...args: any[]) => any
}

/**
 * state类型校验
 */
export interface State {
}