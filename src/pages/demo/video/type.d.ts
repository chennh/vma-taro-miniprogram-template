/**
 * props类型校验
 */
export interface Props {}

/**
 * state类型校验
 */
export interface State {

  /**
   * 常量
   */
  CONSTANTS_NAMES_VIDEO: any

  /**
   * 视频ID
   */
  id: string

  /**
   * 视频上下文
   */
  context: any

  /**
   * 视频封面
   */
  poster: string

  /**
   * 视频标题
   */
  title: string

  /**
   * 视频初始化时间
   */
  initialTime: number

  /**
   * 弹幕列表
   */
  danmuList: any[]

  /**
   * 视频路径
   */
  src: string

  /**
   * 数组精灵
   */
  sprite: any

  /**
   * 数组精灵，是否循环
   */
  isLoop: boolean

  /**
   * 模拟数据
   */
  videoData: any[]
  
  /**
   * 视频时长
   */
  duration: number | null
  
  /**
   * 视频当前播放位置
   */
  currentTime: number

  /**
   * 场景2，当前索引
   */
  currentIndex: number

  /**
   * 场景2，是否播放
   */
  isPlay: boolean

  /**
   * 场景2，是否使用封面
   */
  hasCover: boolean
}