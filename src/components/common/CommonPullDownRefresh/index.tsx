import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// utils
import { CommonStyleWorker } from '@/utils'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      height: 120,
      maxHeight: 160
    }
  }

  render () {
    let { height, maxHeight } = this.state
    let { isScrollToTop, realHeight, isPullDownEnd } = this.props
    if (isScrollToTop) {
      if (realHeight >= maxHeight) {
        realHeight = maxHeight
      }
      if (isPullDownEnd) {
        realHeight = realHeight <= (height / 2) ? 0 : height
      }
    }
    return (
      <View className="match-width">
        {
          isScrollToTop
          ? (
            <View 
              className="common-pull-down-refresh align-center"
              style={{
                height: CommonStyleWorker.px2n(realHeight)
              }}>
              {
                (realHeight > (height / 2))
                ? (
                  <View className="match-parent align-center">
                    <View className="dot dot-1"></View>
                    <View className="dot dot-2 ml-24"></View>
                    <View className="dot dot-3 ml-24"></View>
                  </View>
                )
                : <View />
              }
            </View>
          ) 
          : <View />
        }
      </View>
    )
  }
}