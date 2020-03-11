import Taro, { Component } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
// red-bean
import { 
  CommonWorker, 
  CommonFuncType 
} from '@red-bean/red-bean'
import { 
  AdapterVideo, 
  AdapterVideoFactory 
} from '@red-bean/red-bean-taro'
// type
import { Props, State } from './type'
// style
import './index.scss'

export default class Index extends Component<Props, State> {

  defaultProps = {
    vid: '',
    src: '',
    poster: '',
    title: '',
    danmuList: [],
    initialTime: 0,
    onPlay: () => {},
    onPause: () => {},
    onEnded: () => {},
    onTimeUpdate: () => {},
    onError: () => {},
    onFullscreenChange: () => {},
    onProgress: () => {},
    onWaiting: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      adapterVideoOptions: {},
      context: null,
      bufferSrc: '',
      extraProps: [
        'controls',
        'autoplay',
        'loop',
        'muted',
        'autoPauseIfNavigate',
        'autoPauseIfOpenNative',
        'enablePlayGesture',
        'enableProgressGesture',
        'showCenterPlayBtn',
        'showFullscreenBtn',
        'showMuteBtn',
        'showPlayBtn',
        'showProgress',
        'danmuBtn',
        'enableDanmu',
        'objectFit',
        'playBtnPosition',
        'styles',
        'vslideGesture',
        'vslideGestureInFullscreen'
      ]
    }
  }

  componentWillMount() {
    // 解析props和options
    this.resolvePropsAndOptions()
  }

  componentWillReceiveProps() {
    // 解析props和options
    this.isResolvePropsAndOptionsAgain() && this.resolvePropsAndOptions()
  }

  /**
   * 解析props和options
   * @memberof Index
   */
  resolvePropsAndOptions = () => {
    let { adapterVideoOptions, extraProps } = this.state
    let { title, poster, src, danmuList, initialTime, vid } = this.props
    let context = new AdapterVideo({ id: vid, src, poster, title, danmuList, initialTime, self: this })
    vid && AdapterVideoFactory.setVideo(vid, context)
    adapterVideoOptions = CommonWorker.merge(adapterVideoOptions, context.getOptions())
    let propsOptions = this.onGeneratePropsOptions(extraProps)
    adapterVideoOptions = CommonWorker.merge(adapterVideoOptions, propsOptions)
    this.setState({ adapterVideoOptions, context, bufferSrc: src })
  }

  /**
   * 是否需要重复解析
   * @memberof Index
   */
  isResolvePropsAndOptionsAgain = (): boolean => {
    let { src } = this.props
    let { bufferSrc } = this.state
    return bufferSrc !== src
  }

  onPlay = (e) => {
    let { onPlay } = this.props
    this.onRun(onPlay, e)
  }

  onPause = (e) => {
    let { onPause } = this.props
    this.onRun(onPause, e)
  }

  onEnded = (e) => {
    let { onEnded } = this.props
    let { context } = this.state
    context && context.stop()
    this.onRun(onEnded, e)
  }

  onTimeUpdate = (e) => {
    let { onTimeUpdate } = this.props
    this.onRun(onTimeUpdate, e)
  }

  onError = (e) => {
    let { onError } = this.props
    this.onRun(onError, e)
  }

  onFullscreenChange = (e) => {
    let { onFullscreenChange } = this.props
    this.onRun(onFullscreenChange, e)
  }

  onProgress = (e) => {
    let { onProgress } = this.props
    this.onRun(onProgress, e)
  }

  onWaiting = (e) => {
    let { onWaiting } = this.props
    this.onRun(onWaiting, e)
  }

  onRun = (fn?: CommonFuncType, e?: any) => {
    fn && fn(e)
  }

  /**
   * 解析props生成配置对象
   * @memberof Index
   */
  onGeneratePropsOptions = (key: string | string[]) => {
    let keys = typeof key === 'string' ? [key]: key
    let options: any = {}
    for (let i of keys) {
      if (this.props[i] !== undefined) {
        options[i] = this.props[i]
      }
    }
    return options
  }

  render () {
    let { adapterVideoOptions } = this.state
    return (
      <View className="match-width">
        <Video
          title={adapterVideoOptions.title}
          poster={adapterVideoOptions.poster}
          src={adapterVideoOptions.src}
          id={adapterVideoOptions.id}
          initialTime={adapterVideoOptions.initialTime}
          style={adapterVideoOptions.styles}
          controls={adapterVideoOptions.controls}
          autoplay={adapterVideoOptions.autoplay}
          loop={adapterVideoOptions.loop}
          muted={adapterVideoOptions.muted}
          autoPauseIfNavigate={adapterVideoOptions.autoPauseIfNavigate}
          autoPauseIfOpenNative={adapterVideoOptions.autoPauseIfOpenNative}
          enablePlayGesture={adapterVideoOptions.enablePlayGesture}
          enableProgressGesture={adapterVideoOptions.enableProgressGesture}
          showCenterPlayBtn={adapterVideoOptions.showCenterPlayBtn}
          showFullscreenBtn={adapterVideoOptions.showFullscreenBtn}
          showMuteBtn={adapterVideoOptions.showMuteBtn}
          showPlayBtn={adapterVideoOptions.showPlayBtn}
          showProgress={adapterVideoOptions.showProgress}
          objectFit={adapterVideoOptions.objectFit}
          playBtnPosition={adapterVideoOptions.playBtnPosition}
          danmuBtn={adapterVideoOptions.danmuBtn}
          danmuList={adapterVideoOptions.danmuList}
          enableDanmu={adapterVideoOptions.enableDanmu}
          vslideGesture={adapterVideoOptions.vslideGesture}
          vslideGestureInFullscreen={adapterVideoOptions.vslideGestureInFullscreen}
          onPlay={this.onPlay.bind(this)}
          onPause={this.onPause.bind(this)}
          onEnded={this.onEnded.bind(this)}
          onTimeUpdate={this.onTimeUpdate.bind(this)}
          onError={this.onError.bind(this)}
          onFullscreenChange={this.onFullscreenChange.bind(this)}
          onProgress={this.onProgress.bind(this)}
          onWaiting={this.onWaiting.bind(this)}
        />
      </View>
    )
  }
}