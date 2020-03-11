/**
 * props类型校验
 */
export interface Props {

  /**
   * tabBar数据
   */
  tabBar: any

  /**
   * tabBar索引
   */
  tabBarIndex: number

  /**
   * 是否debug
   */
  debug?: boolean

  /**
   * TabBar切换事件
   */
  onSwitchTab?: (...args: any[]) => any
}

/**
 * state类型校验
 */
export interface State {

  /**
   * tabBar item样式
   */
  styles: any

  /**
   * tabBar item激活样式
   */
  selectedStyles: any

  /**
   * tabBar索引值
   */
  tabBarIndex: number
}