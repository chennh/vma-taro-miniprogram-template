/**
 * 公共属性
 */
export interface Common {
}

/**
 * props类型校验
 */
export interface Props extends Common {

  /**
   * 是否到顶
   */
  isScrollToTop?: boolean

  /**
   * 是否拉到底了
   */
  isPullDownEnd?: boolean

  /**
   * 实时高度
   */
  realHeight: number
}

/**
 * state类型校验
 */
export interface State extends Common {

  /**
   * 组件正常高度
   */
  height: number

  /**
   * 组件最大高度
   */
  maxHeight: number
}