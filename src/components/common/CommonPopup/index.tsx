import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonImage from '../CommonImage'
// assets
import IconClose from '@/assets/images/common/x@2x.png'
import ImagePopup from '@/assets/images/common/icon@2x.png'
// utils
import { isSmallScreen } from '@/utils'

export default class Index extends Component<Props, State> {

  static defaultProps = {
    canBackendTap: false,
    debug: false,
    onClose: () => {},
    onBackendTap: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      topTitle: '讲义链接复制成功',
      bottomItems: [
        {
          label: '讲义链接发送到电脑上'
        },
        {
          label: '在电脑浏览器上输入讲义链接'
        },
        {
          label: '点击浏览器下载即可完成'
        }
      ]
    }
  }

  /**
   * 关闭按钮点击事件
   * @memberof Index
   */
  onClose = (e: any) => {
    let { onClose } = this.props
    onClose && onClose(e)
  }

  /**
   * 背景层点击事件
   * @memberof Index
   */
  onBackendTap = (e: any) => {
    let { onBackendTap, canBackendTap } = this.props
    onBackendTap && canBackendTap && onBackendTap(e)
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

  render () {
    let { topTitle, bottomItems } = this.state
    return (
      <View 
        className="common-popup align-ver-center"
        onTouchMove={this.onTouchMove.bind(this)}>
        <View 
          className="common-popup__inner align-default box pt-50 mb-30"
          style={isSmallScreen() ? {width: '270px', height: '320px' } : {}}>
          <View className="common-popup__title mb-50">
              {topTitle}
          </View>
          <View className="common-popup__image align-center">
            <CommonImage
              width={457}
              height={295}
              src={ImagePopup}
              debug={false}
            />
          </View>
          <View className="common-popup__bottom mt-30">
            {
              bottomItems && bottomItems.length
              ? (
                <View className="match-width align-left">
                  {
                    bottomItems.map((item, index) => {
                      return (
                        <View
                          className="align-left mt-10 mb-10"
                          key={index}>
                          <View className="common-popup__label align-center">
                              {index + 1}
                          </View>
                          <View className="ml-20">
                              {item.label}
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              )
              : <View />
            }
          </View>
        </View>
        <View className="common-popup__close mt-50">
          <CommonImage
            width={64}
            height={64}
            src={IconClose}
            onClick={this.onClose.bind(this)}
            debug={false}
          />
        </View>
        <View 
          className="common-popup__cover"
          onClick={this.onBackendTap.bind(this)} 
        />
      </View>
    )
  }
}