/**
 * props类型校验
 */
export interface Props {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  }
}

/**
 * state类型校验
 */
export interface State {}