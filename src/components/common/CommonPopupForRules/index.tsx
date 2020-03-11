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
// utils
import { CommonStyleWorker } from '@/utils'

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
      topTitle: '排行榜说明',
      bottomItems: []
    }
  }

  componentWillMount() {
    let state = CommonStyleWorker.compareMerge(this.state, this.props) as any
    this.setState(state)
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
        className="common-popup-for-rules align-ver-center">
        <View className="common-popup-for-rules__inner box ptb-50 pl-40 mb-30">
          <View className="common-popup-for-rules__title mb-50 align-center">
              {topTitle}
          </View>
          <View className="common-popup-for-rules__sub_inner">
            {
              bottomItems && bottomItems.length
              ? (
                <View className="match-width">
                  {
                    bottomItems.map((item, index) => {
                      return (
                        <View 
                          className="common-popup-for-rules__subtitle align-top mb-20"
                          key={index}>
                          <View className="required mr-14 mt-4">
                              *
                          </View>
                          <View className="match-left-space">
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
        <View className="common-popup-for-rules__close mt-50">
          <CommonImage
            width={64}
            height={64}
            src={IconClose}
            onClick={this.onClose.bind(this)}
            debug={false}
          />
        </View>
        <View 
          className="common-popup-for-rules__cover"
          onClick={this.onBackendTap.bind(this)}
          onTouchMove={this.onTouchMove.bind(this)} 
        />
      </View>
    )
  }
}