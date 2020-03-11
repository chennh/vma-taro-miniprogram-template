import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// red-bean
import { CommonObjectType } from '@red-bean/red-bean'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonImage from '../CommonImage'
// utils
import { CommonStyleWorker } from '@/utils'

export default class Index extends Component<Props, State> {

  static defaultProps = {
    debug: false
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {},
      selectedStyles: {},
      tabBarIndex: 0
    }
  }

  componentWillMount() {
    this.calculateStyles()
  }

  componentWillReceiveProps(props) {
    this.onRefresh()
  }

  /**
   * 计算样式
   * @memberof Index
   */
  calculateStyles = () => {
    let { tabBar, tabBarIndex } = this.props
    let { color, selectedColor, backgroundColor, borderStyle } = tabBar
    let styles: CommonObjectType = {
      color,
      backgroundColor,
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: borderStyle
    }
    let selectedStyles: CommonObjectType = {
      ...styles,
      color: selectedColor
    }
    styles = CommonStyleWorker.calculateStyles(styles)
    selectedStyles = CommonStyleWorker.calculateStyles(selectedStyles)
    this.setState({ styles, selectedStyles, tabBarIndex })
  }

  /**
   * TabBar切换事件
   * @memberof Index
   */
  onSwitchTab = (data: any, index: number) => {
    let { tabBarIndex } = this.state
    tabBarIndex !== index && this.props.onSwitchTab && this.props.onSwitchTab(data, index)
  }

  /**
   * 实时渲染
   * @memberof Index
   */
  onRefresh = () => {
    let { tabBarIndex } = this.props
    this.setState({ tabBarIndex })
  }

  render () {
    let { tabBar, debug } = this.props
    let { styles, selectedStyles, tabBarIndex } = this.state
    // debug && console.log(styles, selectedStyles)
    debug && console.log(tabBarIndex)
    return (
      <View className="common-tab-bar">
        {
          tabBar && tabBar.list && tabBar.list.length
          ? (
            <View className="common-tab-bar__inner align-top">
              {
                tabBar.list.map((item, index) => {
                  if (!item.isShow) {
                    return <View key={index} />
                  }
                  return (
                    <View 
                      className="common-tab-bar__item align-ver-bottom"
                      style={tabBarIndex === index ? selectedStyles : styles}
                      key={index}
                      onClick={this.onSwitchTab.bind(this, item, index)}>
                      <CommonImage
                        width={item.iconWidth}
                        height={item.iconHeight}
                        src={tabBarIndex === index ? item.selectedIconPath : item.iconPath}
                        debug={false}
                      />
                      <View className="mt-10 mb-20">
                          {item.text}
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
    )
  }
}