/**
 * BottomItemType
 */
export interface BottomItemType {

  /**
   * 标签
   */
  label: string
}

/**
 * props类型校验
 */
export interface Props {

  /**
   * 背景层是否可点击
   */
  canBackendTap?: boolean

  /**
   * 是否可debug
   */
  debug?: boolean

  /**
   * 按钮点击事件
   */
  onClose?: (...args: any[]) => any

  /**
   * 遮罩层点击事件
   */
  onBackendTap?: (...args: any[]) => any

  /**
   * 底部数据
   */
  bottomItems?: BottomItemType[]
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
   * 底部数据
   */
  bottomItems: BottomItemType[]
}