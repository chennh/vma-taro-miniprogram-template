/**
 * props和state公共部分
 */
export interface Common {

  /**
   * 组件id
   */
  vid?: string | number
  
  /**
   * 图片url
   */
  src?: string

  /**
   * 图片是否显示
   */
  showImage?: boolean

    /**
   * 是否显示icon
   */
  showIcon?: boolean

  /**
   * 是否显示文本
   */
  showText?: boolean

  /**
   * 文本内容
   */
  content?: string

  /**
   * 是否成圆形
   */
  isCircle?: boolean

  /**
   * 是否禁用激活效果
   */
  abanActive?: boolean

  /**
   * 图片缩放模式
   * 默认为'scaleToFill'
   */
  mode?: 'scaleToFill' | 'widthFix' | 'aspectFit' | 'aspectFill'

  /**
   * 图片是否支持预览
   */
  canPreview?: boolean

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
   * 组件背景颜色
   */
  backgroundColor?: string

  /**
   * 字体大小
   */
  fontSize?: number

  /**
   * 字体粗细
   */
  fontWeight?: number | string

  /**
   * 字体颜色
   */
  color?: string

  /**
   * 组件透明度大小
   */
  opacity?: number

  /**
   * 文字间隔
   */
  letterSpacing?: number

  /**
   * 边框颜色
   */
  borderColor?: string

  /**
   * 边框大小
   */
  borderWidth?: number

  /**
   * 边框风格
   */
  borderStyle?: 'solid' | 'dashed' | 'dotted'

  /**
   * icon宽度
   */
  iconWidth?: number

  /**
   * icon高度
   */
  iconHeight?: number

  /**
   * 开启debug模式 
   */
  debug?: boolean

  /**
   * 数据对象
   */
  data?: any

  /**
   * 背景
   */
  background?: string
}

/**
 * props类型校验
 */
export interface Props extends Common {

  /**
   * 点击事件
   */
  onClick: (id: any, data: any) => any

  /**
   * 长按事件
   */
  onLongPress: (e: any) => any
}

/**
 * state类型校验
 */
export interface State extends Common {

  /**
   * 组件样式
   */
  styles?: any

  /**
   * 图标样式
   */
  iconStyles?: any

  /**
   * 组件样式
   */
  classes?: string
}