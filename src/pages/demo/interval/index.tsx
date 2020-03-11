import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// red-bean
import { 
  IntervalOptionsPresetType
} from '@red-bean/red-bean'
import { 
  AdapterInterval, 
  AdapterIntervalFactory, 
  setInterval, 
  removeInterval, 
  clearInterval 
} from '@red-bean/red-bean-taro'
// type
import { Props, State } from './type'
// style
import './index.scss'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      interval: null,
      count: -1,
      countDown: 10,
      label: ''
    }
  }

  componentWillMount() {
    // 定时器 test
    const interval = new AdapterInterval((count: number) => {
      this.setState({
        count
      })
    })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   this.setState({
    //     count
    //   })
    // }, { name: 'intervalOne' })

    // 定时器复位 test
    // const interval = new AdapterInterval((count: number) => {
    //   this.setState({
    //     count
    //   })
    // }, {
    //   isCallWhenClose: true
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   this.setState({
    //     count
    //   })
    // }, { name: 'intervalOne' }, IntervalOptionsPresetType.NORMAL_AND_RESET)

    // 延时器 test
    // const interval = new AdapterInterval(() => {
    //   console.log('延时器')
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval(() => {
    //   console.log('延时器')
    // }, { name: 'intervalOne' })

    // 倒计时 test
    // const interval = new AdapterInterval((count) => {
    //   this.setState({
    //     count
    //   })
    // }, {
    //   countDown: 10
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   this.setState({
    //     count
    //   })
    // }, { name: 'intervalOne', countDown: 10 })

    // 倒计时重置 test
    // const interval = new AdapterInterval((count) => {
    //   this.setState({
    //     count
    //   })
    // }, {
    //   countDown: 10,
    //   isCallWhenClose: true
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   this.setState({
    //     count
    //   })
    // }, { name: 'intervalOne', countDown: 10 }, IntervalOptionsPresetType.NORMAL_AND_RESET)

    // 四种间隔序列 test
    
    // 第一种序列

    // 0 -> 1 -> 2 -> 3 
    //                 ...
    //                    -> 4 -> 5 -> 6 -> ... 
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: false,
    //   isCallOtherTimes: false
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne' }, IntervalOptionsPresetType.ORDER_ONLY_FIRST_CALL)

    // 10 -> 9 -> 8 -> 7 
    //                 ...
    //                    -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> 0 
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: false,
    //   isCallOtherTimes: false,  
    //   countDown: 10 
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne', countDown: 10 }, IntervalOptionsPresetType.ORDER_ONLY_FIRST_CALL)

    // 第二种序列

    // 0 -> 1 -> 2 -> 3 
    //                 ...
    //                    3 -> 4 -> 5 -> 6 -> ... 
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: false,
    //   isCallOtherTimes: true
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne' }, IntervalOptionsPresetType.ORDER_BOTH_CALL)

    // 10 -> 9 -> 8 -> 7 
    //                 ...
    //                    7 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> 0
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: false,
    //   isCallOtherTimes: true,
    //   countDown: 10  
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne', countDown: 10 }, IntervalOptionsPresetType.ORDER_BOTH_CALL)

    // 第三种序列

    //   -> 1 -> 2 -> 3 
    //                 ...
    //                    -> 4 -> 5 -> 6 -> ... 
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: true,  
    //   isCallOtherTimes: false
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne' }, IntervalOptionsPresetType.ORDER_NEVER_CALL)

    //   -> 9 -> 8 -> 7 
    //                 ...
    //                    -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> 0
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: true,  
    //   isCallOtherTimes: false,
    //   countDown: 10 
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne', countDown: 10 }, IntervalOptionsPresetType.ORDER_NEVER_CALL)

    // 第四种序列

    //   -> 1 -> 2 -> 3 
    //                 ...
    //                    3 -> 4 -> 5 -> 6 -> ...
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: true,
    //   isCallOtherTimes: true
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne' }, IntervalOptionsPresetType.ORDER_ONLY_OTHER_CALL)

    //   -> 9 -> 8 -> 7 
    //                 ...
    //                    7 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> 0
    // const interval = new AdapterInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   delay: 1000,
    //   isCallWhenClose: false,
    //   isNotCallFirstTimes: true,
    //   isCallOtherTimes: true,
    //   countDown: 10
    // })
    // 使用工厂，name必传
    // const interval = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'intervalOne', countDown: 10 }, IntervalOptionsPresetType.ORDER_ONLY_OTHER_CALL)

    if (interval === null) {
      return
    }
    // 生命周期测试
    interval.onStart = () => {
      console.log('start')
      // this.setState({
      //   label: '启动'
      // })
    }
    interval.onPause = () => {
      console.log('pause')
      // this.setState({
      //   label: '暂停'
      // })
    }
    interval.onRestart = () => {
      console.log('restart')
      // this.setState({
      //   label: '继续'
      // })
    }
    interval.onClose = () => {
      console.log('close')
      // this.setState({
      //   label: '关闭'
      // })
    }

    // 工厂批量测试

    // 同名不覆盖
    const interval2 = AdapterIntervalFactory.createInterval((count: number) => {
      console.log(count)
    }, { name: 'intervalOne' })
    console.log(interval2)
    // 无名不创建
    const interval3 = AdapterIntervalFactory.createInterval((count: number) => {
      console.log(count)
    })
    console.log(interval3)
    // 异名可销毁
    // const interval4 = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'interval4' })
    // if (interval4) {
    //   interval4.onClose = () => {
    //     console.log('interval4 close')
    //   }
    //   interval4.startInterval()
    // }
    // const interval5 = AdapterIntervalFactory.createInterval((count: number) => {
    //   console.log(count)
    // }, { name: 'interval5' })
    // if (interval5) {
    //   interval5.onClose = () => {
    //     console.log('interval5 close')
    //   }
    //   interval5.startInterval()
    // }

    // 简写测试
    // const interval6 = setInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   name: 'interval6'
    // })
    // if (interval6 !== null) {
    //   interval6.onClose = () => {
    //     console.log('interval6 close')
    //   }
    //   interval6.startInterval()
    // }
    // const interval7 = setInterval((count: number) => {
    //   console.log(count)
    // }, {
    //   name: 'interval7'
    // })
    // if (interval7 !== null) {
    //   interval7.onClose = () => {
    //     console.log('interval7 close')
    //   }
    //   interval7.startInterval()
    // }

    this.setState({
      interval
    })
  }

  componentDidMount() {
  }

  render () {
    const { interval, count, label } = this.state
    return (
      <View className="match-width align-default pt-50 plr-40 box pb-50">
        <View className="match-width bg-warn align-center mt-50">
              {count}
        </View>
        <View className="match-width bg-warn align-center mt-50">
              {label}
        </View>
        {
          interval 
          ? (
            <View className="match-width">
              <View className="match-width bg-info align-center mt-50 ptb-30"
                    onClick={() => { interval.startInterval() }}>
                    开启定时器
              </View>
              <View className="match-width bg-info align-center mt-50 ptb-30"
                    onClick={() => { interval.pauseInterval() }}>
                    暂停定时器
              </View>
              <View className="match-width bg-info align-center mt-50 ptb-30"
                    onClick={() => { interval.restartInterval() }}>
                    继续定时器
              </View>
              <View className="match-width bg-danger align-center mt-50 ptb-30"
                    onClick={() => { interval.closeInterval() }}>
                    关闭定时器
              </View>
            </View>
          ) 
          : <View />
        }
        {
          interval 
          ? (
            <View className="match-width">
              <View className="match-width bg-info align-center mt-50 ptb-30"
                    onClick={() => { interval.startTimeout() }}>
                    开启延时器
              </View>
              <View className="match-width bg-danger align-center mt-50 ptb-30"
                    onClick={() => { interval.closeTimeout() }}>
                    关闭延时器
              </View>
            </View>
          ) 
          : <View />
        }
        <View className="match-width">
          <View className="match-width bg-info align-center mt-50 ptb-30"
                onClick={() => { AdapterIntervalFactory.destroyInterval('interval4') }}>
                销毁定时器4
          </View>
        </View>
        <View className="match-width">
          <View className="match-width bg-info align-center mt-50 ptb-30"
                onClick={() => { AdapterIntervalFactory.destroyIntervals(['interval5']) }}>
                销毁定时器5
          </View>
        </View>
        <View className="match-width">
          <View className="match-width bg-info align-center mt-50 ptb-30"
                onClick={() => { AdapterIntervalFactory.destroyIntervals() }}>
                销毁定时器4和5
          </View>
        </View>
        <View className="match-width">
          <View className="match-width bg-info align-center mt-50 ptb-30"
                onClick={() => { removeInterval('interval6') }}>
                销毁定时器6 简写
          </View>
        </View>
        <View className="match-width">
          <View className="match-width bg-info align-center mt-50 ptb-30"
                onClick={() => { clearInterval(['interval7']) }}>
                销毁定时器7 简写
          </View>
        </View>
        <View className="match-width">
          <View className="match-width bg-info align-center mt-50 ptb-30"
                onClick={() => { clearInterval() }}>
                销毁定时器6和7 简写
          </View>
        </View>
      </View>
    )
  }
}