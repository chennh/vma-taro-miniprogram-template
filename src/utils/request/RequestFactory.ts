import Taro from '@tarojs/taro'
import { CommonObjectSprite, CommonWorker } from '@red-bean/red-bean'
import { AdapterStorage } from '@red-bean/red-bean-taro'
import { Request, RequestOptions } from './Request'
import { showLoading, hideLoading, showToast } from '../simple'

import { 
  REQUEST_IS_INTERCEPTOR_OPEN,
  REQUEST_IS_TIMEOUT_ERROR_OPEN,
  REQUEST_IS_LOG_OPEN,
  REQUEST_MAX_NUM,
  REQUEST_TIP,
  REQUEST_FAIL_TIP,
  API_BASE_URL
} from '@/config'

/**
 * RequestFactoryOptions
 */
export interface RequestFactoryOptions {

  /**
   * 是否开启请求打印
   */
  isLogOpen?: boolean

  /**
   * 是否开启请求超时报错打印
   */
  isTimeoutErrorOpen?: boolean

  /**
   * 是否开启拦截
   */
  isInterceptorOpen?: boolean

  /**
   * 请求最大数
   */
  maxLen?: number

  /**
   * 加载提示
   */
  loadTip?: string

  /**
   * BaseUrl
   */
  baseUrl?: string

  /**
   * 缓存，用于存Token
   */
  storage?: AdapterStorage

  /**
   * 请求失败提示
   */
  failTip?: string
}

/**
 * RequestFactory
 */
export class RequestFactory {

  /**
   * 内置实例
   * @private
   * @static
   * @type {(RequestFactory | null)}
   * @memberof RequestFactory
   */
  private static self: RequestFactory | null = null

  /**
   * 默认配置
   * @private
   * @type {RequestFactoryOptions}
   * @memberof RequestFactory
   */
  private options: RequestFactoryOptions = {
    isLogOpen: false,
    isTimeoutErrorOpen: false,
    isInterceptorOpen: true,
    maxLen: 50,
    loadTip: '',
    baseUrl: '',
    failTip: ''
  }

  /**
   * Token
   * @private
   * @type {sting}
   * @memberof Axios
   */
  private token: string = ''

  /**
   * sprite
   * @private
   * @type {(CommonObjectSprite<Request> | null)}
   * @memberof Axios
   */
  private sprite: CommonObjectSprite<Request> | null  = null

  /**
   * 构造方法
   * @param options                   RequestFactoryOptions
   */
  private constructor(options?: RequestFactoryOptions) {
    this.init(options)
  }

  /**
   * 初始化
   * @param options                   RequestFactoryOptions
   */
  private init(options?: RequestFactoryOptions) {
    if (options) {
      if (options.maxLen !== undefined) {
        options.maxLen = Math.floor(options.maxLen)
        options.maxLen = options.maxLen <= 0 ? 0 : options.maxLen
      }
      if (options.isLogOpen) {
        Taro.addInterceptor(Taro.interceptors.logInterceptor)
      }
      if (options.isTimeoutErrorOpen) {
        Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)
      }
      if (options.isInterceptorOpen) {
        const interceptor = (chain: any) => {
          const requestParams = chain.requestParams
          // 请求拦截
          let isInterceptor: boolean = this.requestInterceptor(requestParams)
          if (!isInterceptor) {
            return chain.proceed(requestParams).then(res => {
              // 响应拦截
              let isInterceptor: boolean = this.responseInterceptor(requestParams)
              if (!isInterceptor) {
                return res
              }
              return Promise.reject()
            })
          }
          return Promise.reject()
        }
        Taro.addInterceptor(interceptor)
      }
      CommonWorker.mergeToSource(this.options, options)
      this.createSprite()
    }
  }

  /**
   * 创建精灵
   */
  private createSprite() {
    let { maxLen } = this.options
    this.sprite = new CommonObjectSprite<Request>({ className: Request, maxLen })
  }

  /**
   * 解析Token
   */
  private resolveToken() {
    let { storage } = this.options
    this.token = storage ? storage.get() as string || '' : ''
  }

  /**
   * 获取工厂单例
   * @param options 
   */
  public static store(options?: RequestFactoryOptions): RequestFactory {
    if (RequestFactory.self === null) {
      RequestFactory.self = new RequestFactory(options)
    }
    return RequestFactory.self
  }

  /**
   * 请求拦截
   * @param requestParams                 any
   */
  public requestInterceptor(requestParams: any): boolean {
    // const { method, data, url } = requestParams
    // console.log('requestInterceptor')
    return false
  }

  /**
   * 响应拦截
   * @param requestParams                any
   */
  private responseInterceptor(requestParams: any): boolean {
    // const { method, data, url } = requestParams
    // console.log('responseInterceptor')
    return false
  }

  /**
   * 创建请求类对象
   * @param options                     RequestOptions
   */
  public static createRequest(options: RequestOptions): Promise<any> {
    if (RequestFactory.self && RequestFactory.self.sprite) {
      RequestFactory.self.resolveToken()
      let { baseUrl, loadTip, failTip } = RequestFactory.self.options
      if (options.baseUrl === undefined) {
        options.baseUrl = baseUrl
      }
      if (options.token === undefined) {
        options.token = RequestFactory.self.token
      }
      // let instance = RequestFactory.self.sprite.create(options)
      let instance: any = new Request(options)
      if (instance) {
        let loading = instance.loading
        loadTip && loading && showLoading(loadTip)
        let promise = instance.request().then((res: any) => {
          if (res) {
            if (res.statusCode === 200) {
              loadTip && loading && hideLoading()
              return Promise.resolve(res.data)
            }
            if (res.data) {
              let { message } = res.data
              message && showToast({ title: message })
            }
            loadTip && loading && hideLoading()
            return Promise.reject()
          }
          // TODO res返回为null是否关闭loading
          return Promise.reject()
        }).catch((err: any) =>  {
          if (err) {
            let { errMsg } = err
            if (errMsg) {
              showToast({ title: errMsg })
            } else if (failTip) {
              showToast({ title: failTip as string })
            } else {
              loadTip && loading && hideLoading()
            }
            return Promise.reject(err)
          }
          return Promise.reject()
        })
        // RequestFactory.self.sprite.destroy(instance)
        // TODO 断线重连 = 无限重连 + 限制重连
        // TODO 限制并发请求
        // TODO 因网络造成的问题可以获取状态值
        // TODO 自动生成API文档
        return promise
      }
    }
    return Promise.reject()
  }

  /**
   * 设置缓存
   * @param storage                   AdapterStorage 
   */
  public static setStorage(storage: AdapterStorage) {
    if (RequestFactory.self) {
      RequestFactory.self.options.storage = storage
    }
  }
}

// 全局单例化
RequestFactory.store({
  isLogOpen: REQUEST_IS_LOG_OPEN,
  isTimeoutErrorOpen: REQUEST_IS_TIMEOUT_ERROR_OPEN,
  isInterceptorOpen: REQUEST_IS_INTERCEPTOR_OPEN,
  loadTip: REQUEST_TIP,
  maxLen: REQUEST_MAX_NUM,
  baseUrl: API_BASE_URL,
  failTip: REQUEST_FAIL_TIP
})