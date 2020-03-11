import { observable } from 'mobx'

/**
 * 计数状态管理
 */
const counterStore = observable({
  counter: 0,
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})

export default counterStore