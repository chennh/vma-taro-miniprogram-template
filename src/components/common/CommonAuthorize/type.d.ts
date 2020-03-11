/**
 * props类型校验
 */
export interface Props {

  /**
   * 按钮点击事件
   */
  onClick?: () => any

  /**
   * 弹窗关闭事件
   */
  onClose?: () => any

  /**
   * 获取用户信息
   */
  onGetUserInfo?: (...args) => any

  /**
   * 获取手机号码
   */
  onGetPhoneNumber?: (...args) => any

  /**
   * 开放能力
   */
  openType: 'getUserInfo' | 'getPhoneNumber' | 'share' | 'contact' | 'launchApp' | 'openSetting' | 'feedback'
}

/**
 * state类型校验
 */
export interface State {

  /**
   * 顶部标题
   */
  topTitle: string

  /**
   * 顶部提示
   */
  topTip: string

  /**
   * 顶部按钮文本内容
   */
  topBtnText: string

  /**
   * 顶部小按钮文本内容
   */
  topSmallBtnText: string
}