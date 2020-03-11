/**
 * 公共属性
 */
export interface Common {
 
  /**
   * 宽度
   */
  width?: number

  /**
   * 高度
   */
  height?: number

  /**
   * 图片链接
   */
  src?: string

  /**
   * 提示内容
   */
  tipContent?: string

  /**
   * 是否debug
   */
  debug?: boolean
}

/**
 * props类型校验
 */
export interface Props extends Common {
}

/**
 * state类型校验
 */
export interface State extends Common {

  /**
   * 组件样式
   */
  styles: any
}