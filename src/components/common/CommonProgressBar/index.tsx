import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonProgress from '../CommonProgress'
// utils
import { CommonStyleWorker } from '@/utils'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      styles: {},
      rate: 0,
      maxReversedValue: 0.8,
      isReversed: false,
      barText: '0%',
      barWidth: 80
    }
  }

  componentWillMount() {
    this.calculateStyles()
  }

  /**
   * 计算样式
   * @memberof Index
   */
  calculateStyles = () => {
    let { width, rate } = this.props
    let { maxReversedValue, isReversed, barText, barWidth } = this.state
    if (rate !== undefined && width !== undefined) {
      rate = rate < 0 ? 0 : (rate > 1 ? 1 : rate)
      isReversed = rate >= maxReversedValue
      let translateX: any = width * rate
      if (isReversed) {
        translateX -= barWidth
      }
      translateX = CommonStyleWorker.px2n(translateX)
      let styles = { transform: `translateX(${translateX})` }
      barText = Math.floor(rate * 100) + '%'
      this.setState({ styles, barText, rate, isReversed })
    }
  }

  render () {
    let { width, height, borderRadius, color, backgroundColor, debug } = this.props
    let { rate, styles, isReversed, barText } = this.state
    debug && console.log(rate, styles, isReversed, barText)
    return (
      <View className="common-progress-bar">
        <View 
          className={isReversed ? 'common-progress-bar__bar align-center mb-10 reversed' : 'common-progress-bar__bar align-center mb-10'}
          style={styles}>
          {barText}
        </View> 
        <CommonProgress
          rate={rate}
          width={width}
          height={height}
          borderRadius={borderRadius}
          color={color}
          backgroundColor={backgroundColor}
          debug={debug}
        />
      </View>
    )
  }
}