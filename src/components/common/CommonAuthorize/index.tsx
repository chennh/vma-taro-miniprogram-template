import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonImage from '../CommonImage'
import CommonButton from '../CommonButton'
// assets
import { ThemeColor } from '@/assets'
// assets
import ImageBanner from '@/assets/images/common/banner@2x.png'

export default class Index extends Component<Props, State> {

  static defaultProps = {
    openType: 'getUserInfo'
  }

  constructor(props) {
    super(props)
    this.state = {
      topTitle: '您还未登录',
      topTip: '登录后章鱼编程可为您提供更多服务哦~',
      topBtnText: '点击登录',
      topSmallBtnText: '暂不登录'
    }
  }

  /**
   * 防止滑动穿透
   * @memberof Index
   */
  onTouchMove = (e: any) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  /**
   * 关闭授权登录
   * @memberof Index
   */
  onClose = () => {
    this.props.onClose && this.props.onClose()
  }

  /**
   * 打开授权登录
   * @memberof Index
   */
  onAuthorize = () => {
    console.log('授权登录')
  }

  /**
   * 授权登录
   * @memberof Index
   */
  onGetUserInfo = (e: any) => {
    this.props.onGetUserInfo && this.props.onGetUserInfo(e)
  }

  /**
   * 获取手机号码
   * @memberof Index
   */
  onGetPhoneNumber = (e: any) => {
    this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(e)
  }

  render () {
    let { topTitle, topTip, topBtnText, topSmallBtnText } = this.state
    let { openType } = this.props
    return (
      <View 
        className="common-authorize align-center"
        onTouchMove={this.onTouchMove.bind(this)}>
        <View className="common-authorize__inner align-default">
          <CommonImage
            width={560}
            height={264}
            src={ImageBanner}
            debug={false}
          />
          <View className="common-authorize__bottom align-default">
            <View className="common-authorize__title">
                {topTitle}
            </View>
            <View className="common-authorize__tip">
                {topTip}
            </View>
            <View className="common-authorize__btn">
              <CommonImage
                width={300}
                height={88}
                borderRadius={44}
                fontSize={30}
                showImage={false}
                showText={true}
                abanActive={true}
                content={topBtnText}
                color={ThemeColor.WHITE}
                background={'linear-gradient(0deg,rgba(255,160,0,1),rgba(255,198,102,1))'}
                onClick={this.onAuthorize.bind(this)}
                debug={false}
              />
              <View className="common-authorize__btn__cover">
                <CommonButton 
                  openType={openType}
                  onGetUserInfo={this.onGetUserInfo.bind(this)}
                  onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
                />
              </View>
            </View>
            <View 
              className="common-authorize__small__btn"
              onClick={this.onClose.bind(this)}>
                {topSmallBtnText}
            </View>
          </View>
        </View>
      </View>
    )
  }
}