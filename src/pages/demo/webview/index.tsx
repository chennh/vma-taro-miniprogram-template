import Taro, { Component } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  onBtnClick = () => {
    console.log('按钮点击了')
  }

  render () {
    return (
      <View className="match-width">
        <WebView src="http://www.baidu.com"/>
      </View>
    )
  }
}