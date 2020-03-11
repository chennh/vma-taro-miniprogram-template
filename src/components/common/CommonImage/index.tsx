import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
// red-bean
import { CommonObjectType } from '@red-bean/red-bean'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// utils
import { CommonStyleWorker, previewImage, showToast } from '@/utils'

export default class Index extends Component<Props, State> {

  static defaultProps = {
    onClick: () => {},
    onLongPress: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {},
      vid: '',
      src: '',
      showImage: true,
      showIcon: false,
      showText: false,
      content: '',
      isCircle: false,
      abanActive: true,
      mode: 'scaleToFill',
      canPreview: false,
      width: 300,
      height: 300,
      borderRadius: 0,
      backgroundColor: '',
      fontSize: 24,
      fontWeight: 500,
      color: '',
      opacity: 1,
      letterSpacing: 0,
      borderColor: '',
      borderWidth: 1,
      borderStyle: 'solid',
      iconWidth: 48,
      iconHeight: 48,
      iconStyles: {},
      classes: '',
      debug: false,
      data: null,
      background: ''
    }
  }

  componentWillMount() {
    this.calculateStyles()
  }

  componentWillReceiveProps(props) {
    this.calculateStyles().then(() => {
      this.onRefresh()
    })
  }

  /**
   * 计算样式
   * @memberof Index
   */
  calculateStyles = () => {
    let state: CommonObjectType = CommonStyleWorker.compareMerge(this.state, this.props)
    let styles: CommonObjectType = CommonStyleWorker.mergeStyles(state)
    styles = CommonStyleWorker.calculateStyles(styles)
    let { iconWidth, iconHeight, letterSpacing, abanActive, isCircle } = state
    let iconStyles: CommonObjectType = { width: iconWidth, height: iconHeight, letterSpacing }
    iconStyles = CommonStyleWorker.calculateStyles(iconStyles)
    let classes: string = 'common-image'
    if (!abanActive) {
      classes += ' active'
    }
    if (isCircle) {
      classes += ' circle'
    }
    Reflect.set(state, 'styles', styles)
    Reflect.set(state, 'iconStyles', iconStyles)
    Reflect.set(state, 'classes', classes)
    this.setState(state)
    return Promise.resolve()
  }

  /**
   * 点击事件
   * @memberof Index
   */
  onClick = () => {
    let { canPreview, src, vid, data } = this.state
    canPreview && src && previewImage(src)
    this.props.onClick && this.props.onClick(vid, data)
  }

  /**
   * 图片长按事件
   * @memberof Index
   */
  onLongPress = (e: any) => {
    this.props.onLongPress && this.props.onLongPress(e)
  }

  /**
   * 刷新
   * @memberof Index
   */
  onRefresh = () => {
    // let { src } = this.props
    // src && this.setState({ src })
  }

  render () {
    let { styles, iconStyles, showImage, src, mode, content, showIcon, showText, classes, debug } = this.state
    debug && console.log(classes, styles, src)
    return (
      <View
        className={classes}
        style={styles}
        onClick={this.onClick.bind(this)}
        onLongPress={this.onLongPress.bind(this)}>
        {
          showImage 
          ? (
            src
            ? (
              <Image
                className="match-parent"
                src={src}
                mode={mode}
              />
            )
            : <View />
          )
          : (
            <View className="match-parent align-center">
              {
                showIcon && src
                ? (
                  <Image
                    className="common-image__icon"
                    style={iconStyles}
                    src={src}
                    mode={mode}
                  />
                )
                : <View />
              }
              {
                showIcon && src && showText
                ? (
                  <View className="common-image__padding" />
                )
                : <View />
              }
              {
                showText
                ? (
                  <View>
                    {content}
                  </View>
                )
                : <View />
              }
            </View>
          )
        }
      </View>
    )
  }
}