import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// type
import { Props, State } from './type'
// style
import './index.scss'
// storages
import { storage, testStorage } from '@/storages/test'

export default class Index extends Component<Props, State> {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // Test Case 1
    // this.onTestCaseOne()
    
    // Test Case 2
    // this.onTestCaseTwo()

    // Test Case 3
    // testStorage.get()
  }

  componentDidMount() {
  }

  onTestCaseOne = () => {
    storage.setItem('num', 0)
    storage.setItem('num2', 0.0)
    storage.setItem('num3', NaN)
    storage.setItem('str', '')
    storage.setItem('str2', '    ')
    storage.setItem('bool', false)
    storage.setItem('arr', [])
    storage.setItem('arr2', [1, 2])
    storage.setItem('obj', {})
    storage.setItem('obj2', {a: 1})
    storage.setItem('null', null)
    console.log('num', storage.getItem('num'), typeof storage.getItem('num'))
    console.log('num2', storage.getItem('num2'), typeof storage.getItem('num2'))
    console.log('num3', storage.getItem('num3'), typeof storage.getItem('num3'))
    console.log('str', storage.getItem('str'), typeof storage.getItem('str'))
    console.log('str2', storage.getItem('str2'), typeof storage.getItem('str2'))
    console.log('bool', storage.getItem('bool'), typeof storage.getItem('bool'))
    console.log('arr', storage.getItem('arr'), typeof storage.getItem('arr'))
    console.log('arr2', storage.getItem('arr2'), typeof storage.getItem('arr2'))
    console.log('obj', storage.getItem('obj'), typeof storage.getItem('obj'))
    console.log('obj2', storage.getItem('obj2'), typeof storage.getItem('obj2'))
    console.log('null', storage.getItem('null'), typeof storage.getItem('null'))

    // storage.removeItem('num')
    // storage.removeItem('num2')
    // storage.removeItem('num3')

    // storage.clear()
  }

  onTestCaseTwo = () => {
    testStorage.set('')
    console.log(testStorage.get(), typeof testStorage.get())
    testStorage.remove()
  }

  render () {
    return (
      <View>
        storage
      </View>
    )
  }
}