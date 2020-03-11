import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'

export default class Index extends Component<Props, State> {

  static defaultProps = {
    openType: 'getUserInfo'
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {}
    }
  }

  render () {
    let { openType, onGetUserInfo, onGetPhoneNumber } = this.props
    return (
      <View className="common-button">
        <Button 
          className="common-button__inner"
          openType={openType}
          onGetUserInfo={onGetUserInfo && onGetUserInfo}
          onGetPhoneNumber={onGetPhoneNumber && onGetPhoneNumber}
        />
      </View>
    )
  }
}