import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// red-bean
import { CommonObjectSprite, CommonEventSprite } from '@red-bean/red-bean'
import { setTimeout } from '@red-bean/red-bean-taro'
// type
import { Props, State } from './type'
// taro-ui
import { AtButton } from 'taro-ui'
// styles
import './index.scss'
// routes
import { RouteNames } from '@/routes'
// utils
import {
  showToast,
  showLoading,
  hideLoading,
  navigateToMiniProgram,
  setClipboardData,
  getClipboardData,
  makePhoneCall,
  vibrateLong,
  vibrateShort,
  getSystemInfo,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  setNavigationBarTitle,
  pageScrollTo,
  navigateTo,
  CommonSimpleRouteMethods,
  login,
  getUserInfo
} from '@/utils'

class Plane {
  name = ''
}

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      count: -1,
      sprite: null,
      blocks: [],
      index: '',
      code: '',
      systemInfo: '',
      RouteNames,
      count2: -1,
      count3: -1,
      count4: -1,
      eventSprite: null
    }
  }

  componentWillMount() {
    let sprite = new CommonObjectSprite<Plane>({maxLen: 5, className: Plane })
    let eventSprite = new CommonEventSprite()
    this.setState({ sprite, eventSprite })
    // 设置监听
    CommonEventSprite.on('navigate2', (data) => {
      console.log('common收到', data)
    })
    CommonEventSprite.roll('navigate2scroll', (data) => {
      console.log('common scroll收到', data)
      return data + 1
    })
    CommonEventSprite.roll('common_roll_back', (count4: number) => {
      count4 *= 5
      this.setState({ count4 })
      return count4
    }, true)
    // 事件监听
    eventSprite.onMessage('message', (content) => {
      console.log(content)
    })
  }

  componentDidMount() {
  }

  showToast = () => {
    showToast({ title: '温馨提示' }).then((res) => {
      console.log('xxx', res)
    })
  }

  showLoading = () => {
    showLoading('网络请求中...').then((res) => {
      console.log('toast 开始')
    })
    setTimeout(() => {
      this.hideLoading().then((res) => {
        console.log('toast 结束')
      })
    }, 2000)
  }

  hideLoading = () => {
    return hideLoading()
  }

  sendBoardCast = () => {
    let { count } = this.state
    count++
    CommonEventSprite.emit('group', count)
    this.setState({ count })
  }

  sendBoardCast2 = () => {
    let { count2 } = this.state
    count2++
    CommonEventSprite.emit('group_1v1', count2)
    this.setState({ count2 })
  }

  sendBoardCast3 = () => {
    let { count3 } = this.state
    count3++
    CommonEventSprite.emit('group_1vn_roll', count3)
    this.setState({ count3 })
  }

  sendBoardCast4 = () => {
    let { eventSprite } = this.state
    eventSprite && eventSprite.postMessage('message', '我是common')
  }

  createPlane = () => {
    let { sprite } = this.state
    let data: any = sprite.create()
    if (data) {
      data.name = Math.random() + ''
      let { blocks } = this.state
      blocks.push(data)
      this.setState({ blocks })
    }
  }

  destroyPlane = (key: number) => {
    let { blocks, sprite } = this.state
    if (blocks[key] !== undefined) {
      sprite.destroy(blocks[key])
      blocks.splice(key, 1)
      this.setState({ blocks })
    }
  }

  navigateToMiniProgram = () => {
    navigateToMiniProgram('wx794451f9a4fe0da2', 'pages/home/index')
  }

  setClipboardData = () => {
    setClipboardData('造demo很辛苦a')
  }

  getClipboardData = () => {
    getClipboardData().then((res: any) => {
      showToast({ title: res.data })
    })
  }

  makePhoneCall = () => {
    makePhoneCall('13540360747')
  }

  vibrateLong = () => {
    vibrateLong()
  }

  vibrateShort = () => {
    vibrateShort()
  }

  getSystemInfo = () => {
    let systemInfo = getSystemInfo()
    systemInfo = JSON.stringify(systemInfo)
    this.setState({ systemInfo })
  }

  showNavigationBarLoading = () => {
    showNavigationBarLoading()
  }

  hideNavigationBarLoading = () => {
    hideNavigationBarLoading()
  }

  setNavigationBarTitle = () => {
    setNavigationBarTitle('造demo')
  }

  pageScrollTo = () => {
    pageScrollTo(0)
  }

  login = () => {
    login().then(res => {
      let { code } = res
      if (code) {
        console.log(code)
      }
    })
  }

  getUserInfo = () => {
    getUserInfo().then(res => {
      console.log(res)
    })
  }

  render () {
    let { blocks, systemInfo, count, count2, count3, count4 } = this.state
    return (
      <View className="match-width box plr-40 ptb-50">
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.showToast.bind(this)}>showToast</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.showLoading.bind(this)}>showLoading</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.hideLoading.bind(this)}>hideLoading</AtButton>
        </View>
        <View className="match-width mt-30">
          Common页1vN的{count}
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.sendBoardCast.bind(this)}>发送广播1vN啦</AtButton>
        </View>
        <View className="match-width mt-30">
          Common页1v1的{count2}
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.sendBoardCast2.bind(this)}>发送广播1v1啦</AtButton>
        </View>
        <View className="match-width mt-30">
          Common页1vN roll的{count3}
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.sendBoardCast3.bind(this)}>发送广播1vN roll啦</AtButton>
        </View>
        <View className="match-width mt-30">
          Common页1vN roll back的{count4}
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.sendBoardCast4.bind(this)}>发送群广播啦</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.createPlane.bind(this)}>创建对象</AtButton>
        </View>
        {
          blocks.map((block, key) => {
            return (
              <View
                className="block"
                key={key}
                onClick={this.destroyPlane.bind(this, key)}>
                {block.name}
              </View>
            )
          })
        }
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.navigateToMiniProgram.bind(this)}>跳转到迷虫</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.setClipboardData.bind(this)}>设置剪贴板内容</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.getClipboardData.bind(this)}>获取剪贴板内容</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.makePhoneCall.bind(this)}>打call</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.vibrateLong.bind(this)}>长振动</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.vibrateShort.bind(this)}>短振动</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.getSystemInfo.bind(this)}>获取系统信息</AtButton>
        </View>
        <View className="match-width mt-30 word-break">
          {systemInfo}
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.showNavigationBarLoading.bind(this)}>显示导航条loading</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.hideNavigationBarLoading.bind(this)}>隐藏导航条loading</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.setNavigationBarTitle.bind(this)}>设置页面标题</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.pageScrollTo.bind(this)}>滚动到顶</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="primary" onClick={this.login.bind(this)}>登录</AtButton>
        </View>
        <View className="match-width mt-30">
          <AtButton type="secondary" onClick={this.getUserInfo.bind(this)}>获取用户信息</AtButton>
        </View>
      </View>
    )
  }
}