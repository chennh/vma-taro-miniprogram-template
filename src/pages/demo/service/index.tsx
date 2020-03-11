import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// red-bean
import { CommonEventSprite } from '@red-bean/red-bean'
// type
import { Props, State } from './type'
// style
import './index.scss'
// utils
import { getParamsData, getPreloadData } from '@/utils'
// Taro-ui
import { AtButton } from 'taro-ui'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      count: -1,
      count2: -1,
      count3: -1,
      count4: 0,
      eventSprite: null
    }
  }

  componentWillMount() {
    // console.log(getParamsData(this))
    // console.log(getPreloadData(this))
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
    let eventSprite = new CommonEventSprite()
    this.setState({ eventSprite })
    // 事件监听
    eventSprite.onMessage('message', (content) => {
      console.log(content)
    })
  }

  sendBoardCast = () => {
    let { count4 } = this.state
    count4++
    CommonEventSprite.emit('common_roll_back', count4)
    this.setState({ count4 })
  }

  sendBoardCast4 = () => {
    let { eventSprite } = this.state
    eventSprite && eventSprite.postMessage('message', '我是service')
  }

  render () {
    let { count, count2, count3, count4 } = this.state
    return (
      <View className="match-width">
        <View className="match-width">
          Service页的{count}
        </View>
        <View className="match-width">
          Service页1v1的{count2}
        </View>
        <View className="match-width">
          Service页1vn roll的{count3}
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.sendBoardCast.bind(this)}>消息回滚{count4}</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.sendBoardCast4.bind(this)}>消息群发</AtButton>
        </View>
      </View>
    )
  }
}