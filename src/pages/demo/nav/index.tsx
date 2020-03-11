import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// red-bean
import { CommonEventSprite } from '@red-bean/red-bean'
// type
import { Props, State } from './type'
// taro-ui
import { AtButton } from 'taro-ui'
// styles
import './index.scss'
// utils
// import { CommonEventSprite } from '@/utils'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      count: -1,
      count2: -1,
      count3: -1,
      count4: -1,
      eventSprite: null
    }
  }

  componentWillMount() {
    // console.log(this.props)
    this.listenBoardCast()
  }

  componentDidMount() {
  }

  listenBoardCast = () => {
    CommonEventSprite.on('group', (count: number) => {
      this.setState({ count })
    })
    CommonEventSprite.once('group_1v1', (count2: number) => {
      this.setState({ count2 })
    })
    CommonEventSprite.roll('group_1vn_roll', (count3: number) => {
      count3 *= 10
      this.setState({ count3 })
      return count3
    })
    CommonEventSprite.roll('common_roll_back', (count4: number) => {
      count4 *= 5
      this.setState({ count4 })
      return count4
    }, true)
    let eventSprite = new CommonEventSprite()
    this.setState({ eventSprite })
    // 事件监听
    eventSprite.onMessage('message', (content) => {
      console.log(content)
    })
  }

  sendBoardCast4 = () => {
    let { eventSprite } = this.state
    eventSprite && eventSprite.postMessage('message', '我是nav')
  }

  render () {
    let { count, count2, count3, count4 } = this.state
    return (
      <View className="match-width">
        <View className="match-width">
          导航栏页的{count}
        </View>
        <View className="match-width">
          导航栏页1v1的{count2}
        </View>
        <View className="match-width">
          导航栏页1vn roll的{count3}
        </View>
        <View className="match-width">
          导航栏页1vn roll back的{count4}
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.sendBoardCast4.bind(this)}>发送群广播啦</AtButton>
        </View>
      </View>
    )
  }
}