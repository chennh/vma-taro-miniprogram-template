import { 
  CommonObjectType
} from '@red-bean/red-bean'

/**
 * CommonStyleWorker
 */
export class CommonStyleWorker {

  /**
   * 对象比较合并
   * @param source                    CommonObjectType              
   * @param target                    CommonObjectType
   */
  public static compareMerge(source: CommonObjectType, target: CommonObjectType): CommonObjectType {
    let result: CommonObjectType = {}
    for (let i in source) {
      if (source.hasOwnProperty(i)) {
        if (target[i] !== undefined && target[i] !== null) {
          Reflect.set(result, i, target[i])
        } else {
          Reflect.set(result, i, source[i])
        }
      }
    }
    return result
  }


  /**
   * 对象截取
   * @param source                   CommonObjectType
   * @param filters                  CommonObjectType
   */
  public static filterMerge(source: CommonObjectType, filters?: string[]): CommonObjectType {
    let result: CommonObjectType = {}
    if (filters !== undefined) {
      filters.map((key: string) => {
        if (source[key] !== undefined) {
          Reflect.set(result, key, source[key])
        }
      })
    }
    return result
  }

  /**
   * 过滤空Key
   * @param source                    CommonObjectType
   */
  public static filterEmptyKey(source: CommonObjectType): CommonObjectType {
    let result: CommonObjectType = {}
    for (let i in source) {
      if (source.hasOwnProperty(i)) {
        if (source[i] === 'string') {
          source[i] && Reflect.set(result, i, source[i])
        } else if (source[i] === null || source[i] === undefined) {
          continue
        } else {
          Reflect.set(result, i, source[i])
        }
      }
    }
    return result
  }

  /**
   * 样式单位转换
   * @param px                         number
   */
  public static px2n(px: number): string | number {
    return px <= 0 ? 0 : px / 2 + 'px'
  }

  /**
   * 组件样式
   * @param styles                     CommonObjectType
   */
  public static calculateStyles(styles: CommonObjectType): CommonObjectType {
    let filters: string[] = ['opacity', 'fontWeight']
    for (let i in styles) {
      if (styles.hasOwnProperty(i)) {
        if (typeof styles[i] === 'number') {
          if (filters.indexOf(i) === -1) {
            styles[i] = CommonStyleWorker.px2n(styles[i])
          }
        }
      }
    }
    return styles
  }

  /**
   * 合并样式
   * @param styles                    CommonObjectType
   * @param filters                   过滤条件
   */
  public static mergeStyles(styles: CommonObjectType): CommonObjectType {
    let filters: string[] = ['width', 'height', 'borderRadius','backgroundColor', 'fontSize', 'fontWeight', 'color', 'opacity', 'letterSpacing', 'borderColor', 'borderStyle', 'borderWidth', 'background']
    let result: CommonObjectType = CommonStyleWorker.filterMerge(styles, filters)
    if (Reflect.ownKeys(styles).indexOf('borderColor') !== -1) {
      if (!styles.borderColor) {
        result['border'] = 'none'
      }
    }
    return CommonStyleWorker.filterEmptyKey(result)
  }

  /**
   * 去除属性
   * @param styles                   CommonObjectType
   * @param filters                  去除条件
   */
  public static removeStyles(styles: CommonObjectType, filters: string[]): CommonObjectType {
    let tmpStyles: CommonObjectType = {}
    for (let i in styles) {
      if (styles.hasOwnProperty(i)) {
        if (filters.indexOf(i) === -1) {
          Reflect.set(tmpStyles, i, styles[i])
        }
      }
    }
    return tmpStyles
  }

  /**
   * 获取样式
   * @param source                   CommonObjectType
   * @param filters                  CommonObjectType
   */
  public static getStyles(source: CommonObjectType, target: CommonObjectType): CommonObjectType {
    let tmpResult: CommonObjectType = CommonStyleWorker.compareMerge(source, target)
    let tmpStyles: CommonObjectType = CommonStyleWorker.filterMerge(tmpResult)
    return CommonStyleWorker.calculateStyles(tmpStyles)
  }
}