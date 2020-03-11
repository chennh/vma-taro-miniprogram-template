/**
 * props类型校验
 */
export interface Props {

  /**
   * 视频id，由于id传不进来，故改为vid
   */
  vid: string

  /**
   * 视频路径
   */
  src: string

  /**
   * 视频标题
   */
  title?: string

  /**
   * 视频封面
   */
  poster?: string

  /**
   * 弹幕列表
   */
  danmuList?: any[]

  /**
   * 视频初始化时长
   */
  initialTime?: number

  /**
   * 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
   */
  controls?: boolean

  /**
   * 是否自动播放
   */
  autoplay?: boolean

  /**
   * 是否循环播放
   */
  loop?: boolean

  /**
   * 是否静音播放
   */
  muted?: boolean

  /**
   * 当跳转到其它小程序页面时，是否自动暂停本页面的视频
   */
  autoPauseIfNavigate?: boolean

  /**
   * 当跳转到其它微信原生页面时，是否自动暂停本页面的视频
   */
  autoPauseIfOpenNative?: boolean

  /**
   * 是否开启播放手势，即双击切换播放/暂停
   */
  enablePlayGesture?: boolean

  /**
   * 是否开启控制进度的手势
   */
  enableProgressGesture?: boolean

  /**
   * 是否显示视频中间的播放按钮
   */
  showCenterPlayBtn?: boolean

  /**
   * 是否显示全屏按钮
   */
  showFullscreenBtn?: boolean

  /**
   * 是否显示静音按钮
   */
  showMuteBtn?: boolean

  /**
   * 是否显示视频底部控制栏的播放按钮
   */
  showPlayBtn?: boolean

  /**
   * 若不设置，宽度大于240时才会显示
   */
  showProgress?: boolean

  /**
   * 是否显示弹幕按钮，只在初始化时有效，不能动态变更
   */
  danmuBtn?: boolean

  /**
   * 是否展示弹幕，只在初始化时有效，不能动态变更
   */
  enableDanmu?: boolean

  /**
   * 在非全屏模式下，是否开启亮度与音量调节手势（同 pageGesture）
   */
  vslideGesture?: boolean

  /**
   * 在全屏模式下，是否开启亮度与音量调节手势
   */
  vslideGestureInFullscreen?: boolean

  /**
   * 当视频大小与 video 容器大小不一致时，视频的表现形式
   */
  objectFit?: 'fill' | 'contain' | 'cover'

  /**
   * 播放按钮的位置
   */
  playBtnPosition?: 'bottom' | 'center'

  /**
   * 样式
   */
  styles?: {}

  /**
   * 当开始/继续播放时触发 play 事件
   */
  onPlay?: () => {}

  /**
   * 当暂停播放时触发 pause 事件
   */
  onPause?: () => {}

  /**
   * 当播放到末尾时触发 ended 事件
   */
  onEnded?: () => {}

  /**
   * 播放进度变化时触发。触发频率 250ms 一次
   */
  onTimeUpdate?: () => {}

  /**
   * 视频播放出错时触发
   */
  onError?: () => {}

  /**
   * 视频进入和退出全屏时触发，event.detail = {fullScreen, direction}，direction 有效值为 vertical 或 horizontal
   */
  onFullscreenChange?: () => {}

  /**
   * 加载进度变化时触发，只支持一段加载。event.detail = {buffered}，百分比
   */
  onProgress?: () => {}

  /**
   * 视频出现缓冲时触发
   */
  onWaiting?: () => {}
}

/**
 * state类型校验
 */
export interface State {

  /**
   * 视频配置
   */
  adapterVideoOptions: any

  /**
   * 上下文
   */
  context: any

  /**
   * 额外属性
   */
  extraProps: string[]

  /**
   * 视频路径缓存
   */
  bufferSrc: string
}