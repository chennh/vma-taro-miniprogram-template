import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonChart from '@/components/common/CommonChart'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      rate: 0.25
    }
  }

  render () {
    let { rate } = this.state
    return (
      <View className="match-width">
        <CommonChart
          canvasId="chartId"
          rate={rate}
          debug={true}
        />
      </View>
    )
  }
}