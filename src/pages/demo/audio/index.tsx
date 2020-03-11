import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// red-bean
import { AdapterInnerAudio } from '@red-bean/red-bean-taro'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// taro-ui
import { AtButton } from 'taro-ui'
// api
import { audioData } from './mock'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      audioData,
      context: null
    }
  }

  componentWillMount() {
    // 获取音频上下文
    this.getAudios()
  }

  /**
   * 获取音频上下文
   * @memberof Index
   */
  getAudios = () => {
    let { audioData } = this.state
    let context = new AdapterInnerAudio(audioData[0])
    context.onInnerAudioPlay = () => {
      console.log('播放')
      
    }
    context.onInnerAudioPause = () => {
      console.log('暂停')
      console.log(context.currentTime)
      console.log(context.duration)
    }
    context.onInnerAudioStop = () => {
      console.log('停止')
    }
    context.onError = (e) => {
      console.log('error', e)
    }
    this.setState({ context })
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
   * 暂停
   * @memberof Index
   */
  pause = () => {
    let { context } = this.state
    context && context.pause()
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
    let { context } = this.state
    context && context.seek(5)
  }

  /**
   * 销毁
   * @memberof Index
   */
  destroy = () => {
    let { context } = this.state
    context && context.destroy()
  }

  render () {
    return (
      <View className="match-width pt-50 pb-50 plr-40 box">
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.play.bind(this)}>播放</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.pause.bind(this)}>暂停</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.stop.bind(this)}>停止</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.seek.bind(this)}>跳转</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.destroy.bind(this)}>销毁</AtButton>
        </View>
      </View>
    )
  }
}