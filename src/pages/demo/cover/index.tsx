import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonPopup from '@/components/common/CommonPopup'
// taro ui
import { AtButton } from 'taro-ui'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  onClose = () => {
    console.log('关闭按钮')
    this.onPopup(false)
  }

  onBackend = () => {
    console.log('关闭背景')
    this.onPopup(false)
  }

  onPopup = (showPopup: boolean) => {
    this.setState({ showPopup })
  }

  render () {
    let { showPopup } = this.state
    return (
      <View className="match-width">
        <AtButton
          type="primary"
          onClick={this.onPopup.bind(this, true)}>
            召唤遮罩层
        </AtButton>
        {
          showPopup
          ? (
            <CommonPopup
              canBackendTap={false}
              onClose={this.onClose.bind(this)}
              onBackendTap={this.onBackend.bind(this)}
            />
          )
          : <View />
        }
      </View>
    )
  }
}