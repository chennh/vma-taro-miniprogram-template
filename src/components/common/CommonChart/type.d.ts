/**
 * 公共属性
 */
export interface Common {

  /**
   * 画布ID
   */
  canvasId?: string

  /**
   * Canvas类型
   */
  type?: '2d' | 'webgl'

  /**
   * 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新
   */
  disableScroll?: boolean

  /**
   * 组件宽度
   */
  width?: number

  /**
   * 组件高度
   */
  height?: number

  /**
   * 组件背景色
   */
  backgroundColor?: string

  /**
   * 占据比
   */
  rate?: number

  /**
   * 是否debug
   */
  debug?: boolean
}

/**
 * props类型校验
 */
export interface Props extends Common {

  /**
   * 错误事件
   */
  onError?: (...args: any[]) => any
}

/**
 * state类型校验
 */
export interface State extends Common {

  /**
   * 样式
   */
  styles: any  
}