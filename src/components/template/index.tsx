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
      <View className="match-width">
        hello world
      </View>
    )
  }
}