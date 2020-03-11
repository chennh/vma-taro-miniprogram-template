import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// utils
import { CommonStyleWorker } from '@/utils'
// config
import { IMG_NO_DATA } from '@/config'
// components
import CommonImage from '../CommonImage'

export default class Index extends Component<Props, State> {

  static defaultProp = {
    width: 298,
    height: 214
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {},
      width: 298,
      height: 214,
      src: '',
      tipContent: '无列表数据 ~',
      debug: false
    }
  }

  componentWillMount() {
    this.calculateStyles()
  }

  /**
   * 计算样式
   * @memberof Index
   */
  calculateStyles = () => {
    let state = CommonStyleWorker.compareMerge(this.state, this.props)
    let styles = CommonStyleWorker.mergeStyles(state)
    styles = CommonStyleWorker.calculateStyles(styles)
    Reflect.set(state, 'styles', styles)
    this.setState(state as any)
  }

  render () {
    let { styles, src, debug, tipContent } = this.state
    debug && console.log(styles, src, tipContent)
    return (
      <View
        className="common-no-data align-default">
        <CommonImage
          width={styles.width}
          height={styles.height}
          src={src || IMG_NO_DATA}
          debug={debug}
        />
        <View className="match-width align-center mt-30 box pl-20">
            {tipContent}
        </View>
      </View>
    )
  }
}