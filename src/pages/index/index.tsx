import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

class Index extends Component {

  config: Config = {
    navigationBarTitleText: '模板世界'
  }

  render () {
    return (
      <View>
        欢迎来到模板世界 
      </View>
    )
  }
}

export default Index  as ComponentType
