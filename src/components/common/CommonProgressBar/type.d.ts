/**
 * 公共属性
 */
export interface Common {

  /**
   * 组件宽度
   */
  width?: number

  /**
   * 组件高度
   */
  height?: number

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
   * Bar样式
   */
  styles: any

  /**
   * 最大反转占比
   */
  maxReversedValue: number

  /**
   * 是否反转
   */
  isReversed: boolean

  /**
   * Bar上的文本内容
   */
  barText: string

  /**
   * Bar的宽度
   */
  barWidth: number
}