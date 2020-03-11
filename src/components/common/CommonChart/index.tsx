import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
// red-bean-taro
import { setTimeout } from '@red-bean/red-bean-taro'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// utils
import { CommonStyleWorker, createCanvasContext } from '@/utils'
// assets
import { ThemeColor } from '@/assets'

export default class Index extends Component<Props, State> {

  static defaultProps = {
    onError: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {},
      canvasId: 'chart',
      width: 340,
      height: 340,
      backgroundColor: '',
      disableScroll: true,
      rate: 0,
      debug: false
    }
  }

  componentWillMount() {
    this.calculateStyles()
  }

  componentDidMount() {
    // 解决渲染太快导致的数据不更新问题
    this.checkRate()
    setTimeout(() => {
      this.drawChart()
    })
  }

  /**
   * 错误事件
   * @memberof Index
   */
  onError = (e: any) => {
    let { onError } = this.props
    onError && onError(e)
  }

  /**
   * 计算样式
   * @memberof Index
   */
  calculateStyles = () => {
    let state: any = CommonStyleWorker.compareMerge(this.state, this.props)
    let styles: any = CommonStyleWorker.mergeStyles(state)
    styles = CommonStyleWorker.calculateStyles(styles)
    Reflect.set(state, 'styles', styles)
    this.setState(state)
  }

  /**
   * 检查rate
   * @memberof Index
   */
  checkRate = () => {
    let { rate } = this.state
    if (rate !== undefined) {
      rate = rate < 0 ? 0 : (rate > 1 ? 1 : rate)
      this.setState({ rate })
    }
  }

  /**
   * 绘制图表
   * @memberof Index
   */
  drawChart = () => {
    let { canvasId, rate } = this.state
    if (canvasId !== undefined && rate!== undefined && rate >= 0 && rate <= 1) {
      let context = createCanvasContext(canvasId, this)
      context.lineWidth = 30
      context.strokeStyle = ThemeColor.THIRD
      context.beginPath()
      context.arc(85, 85, 55, 2 * Math.PI * (-0.25), 2 * Math.PI * (-0.25 + rate))
      context.stroke()
      context.closePath()
      context.lineWidth = 25
      context.strokeStyle = ThemeColor.SECONDARY
      context.beginPath()
      context.arc(85, 85, 55, 2 * Math.PI * (-0.25 + rate), 2 * Math.PI * (0.75))
      context.stroke()
      context.draw()
    }
  }

  render () {
    let { styles, canvasId, disableScroll, debug, rate } = this.state
    debug && console.log(canvasId, styles, rate)
    return (
      <Canvas
        canvasId={canvasId || ''}
        style={styles}
        disableScroll={disableScroll}
        onError={this.onError.bind(this)}
        onTouchStart={() => {}}
        onTouchMove={() => {}}
        onTouchEnd={() => {}}
        onTouchCancel={() => {}}
        onLongTap={() => {}}
      />
    )
  }
}