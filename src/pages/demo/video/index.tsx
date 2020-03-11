import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
// red-bean
import { 
  CommonArraySprite, 
  CommonWorker 
} from '@red-bean/red-bean'
import { 
  AdapterVideoFactory, 
  setTimeout 
} from '@red-bean/red-bean-taro'
// type
import { Props, State } from './type'
// style
import './index.scss'
// components
import CommonVideo from '@/components/common/CommonVideo'
// taro-ui
import { AtButton } from 'taro-ui'
// api
import { videoData } from './mock'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      CONSTANTS_NAMES_VIDEO: {
        PAGES_DEMO_VIDEO: 'xxx'
      },
      poster: '',
      title: '',
      initialTime: 0,
      src: '',
      danmuList: [],
      id: '',
      context: null,
      sprite: null,
      isLoop: true,
      videoData,
      duration: null,
      currentTime: 0,
      currentIndex: 0,
      isPlay: false,
      hasCover: false
    }
  }

  componentWillMount() {
    // 初始化数组精灵
    this.initArraySprite()
  }

  componentDidMount() {
    // 获取video上下文
    this.getVideos()
  }

  componentDidShow() {
    // 暂停视频
    this.pause()
  }

  /**
   * 初始化数组精灵
   * @memberof Index
   */
  initArraySprite = () => {
    let { isLoop, videoData, CONSTANTS_NAMES_VIDEO } = this.state
    let sprite = new CommonArraySprite<any>(videoData, { isLoop })
    let data = sprite.get()
    this.initVideoData(data)
    let id = CONSTANTS_NAMES_VIDEO.PAGES_DEMO_VIDEO
    this.setState({ sprite, id })
  }

  /**
   * 初始化视频数据
   * @memberof Index
   */
  initVideoData = (data: any) => {
    if (data !== null) {
      let { src, poster, title, initialTime, danmuList } = data
      this.setState({ src, poster, title, initialTime, danmuList })
    }
  }

  /**
   * 获取video上下文
   * @memberof Index
   */
  getVideos = () => {
    let { id } = this.state
    let context = AdapterVideoFactory.getVideo(id)
    if (context) {
      context.onVideoPlay = () => {
        // console.log('play')
      }
      context.onVideoPause = () => {
        // console.log('pause')
      }
      context.onVideoStop = () => {
        // console.log('stop')
      }
    }
    this.setState({ context })
  }

  /**
   * 暂停
   * @memberof Index
   */
  pause = () => {
    let { context } = this.state
    context && context.pause()
  }

  /**
   * 播放
   * @memberof Index
   */
  play = () => {
    let { context } = this.state
    context && context.play()
  }

  /**
   * 停止
   * @memberof Index
   */
  stop = () => {
    let { context } = this.state
    context && context.stop()
  }

  /**
   * 跳转
   * @memberof Index
   */
  seek = () => {
    // seek的值需小于duration
    let { context } = this.state
    context && context.seek(10)
  }

  /**
   * 播放下一个视频
   * @memberof Index
   */
  playNext = () => {
    this.stop()
    let { sprite } = this.state
    let data = sprite.getNext()
    this.initVideoData(data)
    setTimeout(() => {
      this.getVideos()
      setTimeout(() => {
        this.play()
      }, 100)
    }, 100)
  }

  /**
   * 播放前一个视频
   * @memberof Index
   */
  playPrev = () => {
    this.stop()
    let { sprite } = this.state
    let data = sprite.getPrev()
    this.initVideoData(data)
    setTimeout(() => {
      this.getVideos()
      setTimeout(() => {
        this.play()
      }, 100)
    }, 100)
  }

  /**
   * 发送弹幕
   * @memberof Index
   */
  sendDanmus = () => {
    let { context, currentTime, duration } = this.state
    context && context.sendDanmus(['456', '789'])
    console.log('发送弹幕的时间', Math.floor(currentTime), duration)
  }

  /**
   * 进入全屏
   * @memberof Index
   */
  requestFullScreen = () => {
    let { context } = this.state
    context && context.requestFullScreen()
  }

  /**
   * 退出全屏
   * @memberof Index
   */
  exitFullScreen = () => {
    let { context } = this.state
    context && context.exitFullScreen()
  }

  /**
   * 设置播放速率
   * @memberof Index
   */
  playbackRate = (rate: number) => {
    let { context } = this.state
    context && context.playbackRate(rate)
  }

  /**
   * 监听onPlay事件
   * @memberof Index
   */
  onPlay = (e) => {
    // console.log('play', e)
  }

  /**
   * 监听onPause事件
   * @memberof Index
   */
  onPause = (e) => {
    // console.log('pause', e)
  }

  /**
   * 监听onEnded事件
   * @memberof Index
   */
  onEnded = (e) => {
    // 重新获取上下文
    // this.getVideos()
  }

  /**
   * 监听onError事件
   * @memberof Index
   */
  onError = (e) => {
    console.log('error', e.detail)
    if (e && e.detail && e.detail.errMsg) {
      Taro.showToast({
        title: e.detail.errMsg,
        icon: 'none'
      })
    }
  }

  /**
   * 监听onWaiting事件
   * @memberof Index
   */
  onWaiting = (e) => {
    // console.log('waiting', e)
  }

  /**
   * 监听onTimeUpdate事件
   * @memberof Index
   */
  onTimeUpdate = (e) => {
    let { currentTime, duration } = e.detail
    this.setState({ currentTime, duration })
  }

  /**
   * 视频点击切换
   * @memberof Index
   */
  onVideoClick = (index: number, id: string) => {
    let { videoData, CONSTANTS_NAMES_VIDEO } = this.state
    for (let i of videoData) {
      let key: string = CONSTANTS_NAMES_VIDEO.PAGES_DEMO_VIDEO + i.id
      let context = AdapterVideoFactory.getVideo(key)
      context && context.stop()
    }
    this.setState({
      currentIndex: index,
      isPlay: true
    })
    setTimeout(() => {
      let key: string = CONSTANTS_NAMES_VIDEO.PAGES_DEMO_VIDEO + id
      let context = AdapterVideoFactory.getVideo(key)
      context && context.play()
    }, 100)
  }

  render () {
    let { src, id, poster, title, initialTime, danmuList, videoData, currentIndex, isPlay, hasCover, CONSTANTS_NAMES_VIDEO } = this.state
    return (
      <View className="match-width pt-50 pb-50">
        {/* 场景一 */}
        <View className="match-width">
          {/* 视频区域 */}
          <CommonVideo
            vid={id}
            src={src}
            poster={poster}
            title={title}
            danmuList={danmuList}
            initialTime={initialTime}
            enableDanmu={true}
            danmuBtn={true}
            onPlay={this.onPlay.bind(this)}
            onPause={this.onPause.bind(this)}
            onEnded={this.onEnded.bind(this)}
            onError={this.onError.bind(this)}
            onWaiting={this.onWaiting.bind(this)}
            onTimeUpdate={this.onTimeUpdate.bind(this)}
          />
          {/* 按钮区域 */}
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="primary" onClick={this.pause.bind(this)}>暂停</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="secondary" onClick={this.play.bind(this)}>播放</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="primary" onClick={this.stop.bind(this)}>停止</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="secondary" onClick={this.seek.bind(this)}>跳转</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="primary" onClick={this.playNext.bind(this)}>下一个视频</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="secondary" onClick={this.playPrev.bind(this)}>上一个视频</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="primary" onClick={this.sendDanmus.bind(this)}>发送弹幕</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="secondary" onClick={this.requestFullScreen.bind(this)}>进入全屏</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="primary" onClick={this.exitFullScreen.bind(this)}>退出全屏</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="secondary" onClick={this.playbackRate.bind(this, 2)}>2倍速率播放</AtButton>
          </View>
          <View className="match-width mt-20 plr-40 box">
            <AtButton type="primary" onClick={this.playbackRate.bind(this, 1)}>1倍速率播放</AtButton>
          </View>
        </View>
        {/* 场景二 */}
        <View className="match-width mt-50">
          {
            videoData.map((item, index) => {
              return (
                <View 
                  className="video-item mt-30"
                  key={item.id} >
                  {
                    hasCover && (index !== currentIndex || !isPlay)
                    ? (
                      <View
                        className="video-item__cover"
                        onClick={this.onVideoClick.bind(this, index, item.id)}>
                        <Image className="match-parent" src={item.poster}/>
                      </View>
                    )
                    : (
                      <CommonVideo
                        vid={(CONSTANTS_NAMES_VIDEO.PAGES_DEMO_VIDEO + item.id)}
                        src={item.src}
                        title={item.title}
                        showCenterPlayBtn={!hasCover}
                        showMuteBtn={false}
                      />
                    )
                  }
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}