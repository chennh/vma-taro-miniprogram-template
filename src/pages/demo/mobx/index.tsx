import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// type
import { Props, State } from './type'
// style
import './index.scss'
// mobx
import { observer, inject } from '@tarojs/mobx'
// store
import { StoreNames } from '@/store'

@inject(StoreNames.COUNTER_STORE)
@observer
export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}