import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonImage from '../CommonImage'
// utils
import { CommonStyleWorker } from '@/utils'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      styles: {},
      width: 200,
      height: 60,
      borderRadius: 10,
      rate: 0,
      backgroundColor: '#F0F0F0',
      color: '#4A8BFA',
      backendStyles: {},
      debug: false
    }
  }

  componentWillMount() {
    this.calculateStyles()
  }

  componentWillReceiveProps(props) {
    this.onRefresh()
  }

  /**
   * 重新计算样式
   * @memberof Index
   */
  calculateStyles = () => {
    let state = CommonStyleWorker.compareMerge(this.state, this.props)
    let tmpStyles = CommonStyleWorker.mergeStyles(state)
    let styles = CommonStyleWorker.removeStyles(tmpStyles, ['color'])
    let backendStyles = CommonStyleWorker.removeStyles(tmpStyles, ['color'])
    Reflect.set(styles, 'backgroundColor', tmpStyles['color'] || '')
    // styles = CommonStyleWorker.calculateStyles(styles)
    backendStyles = CommonStyleWorker.calculateStyles(backendStyles)
    Reflect.set(state, 'styles', styles)
    Reflect.set(state, 'backendStyles', backendStyles)
    let { rate } = state
    rate = rate < 0 ? 0 : (rate > 1 ? 1 : rate)
    Reflect.set(state, 'rate', rate)
    this.setState(state as any)
  }

  /**
   * 刷新
   * @memberof Index
   */
  onRefresh = () => {
    let { rate } = this.props
    if (rate !== undefined) {
      rate = rate < 0 ? 0 : (rate > 1 ? 1 : rate)
      this.setState({ rate })
    }
  }

  render () {
    let { styles, backendStyles, rate, debug } = this.state
    if (debug) {
      console.log('前景', styles)
      console.log('背景', backendStyles)
      console.log('rate', rate)
    }
    return (
      <View 
        className="common-progress"
        style={backendStyles}>
        {
          rate !== undefined && rate > 0 && rate <= 1
          ? (
            <CommonImage
              width={styles.width * rate}
              height={styles.height}
              backgroundColor={styles.backgroundColor}
              borderRadius={styles.borderRadius}
            />
          )
          : <View />
        }
      </View>
    )
  }
}