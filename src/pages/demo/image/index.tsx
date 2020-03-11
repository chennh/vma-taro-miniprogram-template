import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
// type
import { Props, State } from './type'
// styles
import './index.scss'
// components
import CommonImage from '@/components/common/CommonImage'
// assets
import ImageNoData from '@/assets/images/common/no-data@2x.png'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  render () {
    return (
      <View className="match-width">
        <CommonImage
          vid={123}
          src={ImageNoData}
          showImage={false}
          showIcon={false}
          showText={true}
          content={'我是文字'}
          isCircle={false}
          abanActive={false}
          canPreview={false}
          width={600}
          height={98}
          borderRadius={49}
          backgroundColor={'#FFC319'}
          fontSize={36}
          fontWeight={'bold'}
          color={'#000000'}
          opacity={0.8}
          letterSpacing={1.6}
          iconWidth={0}
          iconHeight={0}
          debug={false}
          onClick={(id) => {console.log('xx', id)}}
        />
      </View>
    )
  }
}