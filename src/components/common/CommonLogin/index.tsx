import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonImage from '../CommonImage'
// assets
import { ThemeColor } from '@/assets'
// assets
import ImageLogin from '@/assets/images/common/login@2x.png'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      btnText: '点击登录'
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  render () {
    let { btnText } = this.state
    return (
      <View className="common-login">
        <CommonImage
          width={'100%'}
          height={'100%'}
          mode={'widthFix'}
          src={ImageLogin}
          debug={false}
        />
        <View className="common-login__cover">
          <View className="common-login__btn align-center">
            <CommonImage
              width={600}
              height={98}
              borderRadius={49}
              letterSpacing={4}
              fontSize={36}
              showText={true}
              content={btnText}
              showImage={false}
              color={ThemeColor.TEXT_COLOR}
              background={'linear-gradient(0deg,rgba(255,160,0,1),rgba(255,198,102,1))'}
              onClick={this.props.onClick && this.props.onClick.bind(this)}
              debug={false}
            />
          </View>
        </View>
      </View>
    )
  }
}