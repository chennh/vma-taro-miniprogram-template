import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  render () {
    return (
      <View className="common-no-more-data align-center box ptb-50">
        <View className="common-no-more-data__bar"></View>
        <View className="plr-50">数据到底了 ~</View>
        <View className="common-no-more-data__bar"></View>
      </View>
    )
  }
}