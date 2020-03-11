/**
 * 公共属性
 */
export interface Common {

  /**
   * 组件宽度
   */
  width?: number | string

  /**
   * 组件高度
   */
  height?: number | string

  /**
   * 组件圆角大小
   */
  borderRadius?: number

  /**
   * 进度
   */
  rate?: number

  /**
   * 背景色
   */
  backgroundColor?: string

  /**
   * 前景色
   */
  color?: string

  /**
   * 是否debug
   */
  debug?: boolean
}

/**
 * props类型校验
 */
export interface Props extends Common {}

/**
 * state类型校验
 */
export interface State extends Common {

  /**
   * 进度条前景样式
   */
  styles: any

  /**
   * 进度条背景样式
   */
  backendStyles: any
}