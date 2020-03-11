import Taro from '@tarojs/taro'
import { CommonWorker, CommonUrlWorker, CommonObjectType } from '@red-bean/red-bean'

/**
 * 响应的数据类型
 */
export type RequestResponseType = 'text' | 'arraybuffer'

/**
 * 返回的数据格式
 */
export type RequestDataType = 'json' | 'text'

/**
 * 设置请求的 header，header 中不能设置 Referer，Content-Type
 */
export enum RequestContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
  FILE = 'multipart/form-data'
}

/**
 * param参数
 */
export type RequestParam = number | string

/**
 * 请求的参数
 */
export type RequestData = CommonObjectType

/**
 * HTTP 请求方法
 */
export type RequestMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

/**
 * RequestOptions
 */
export interface RequestOptions {

  /**
   * 请求地址
   */
  url: string

  /**
   * 请求方法
   */
  method?: RequestMethod

  /**
   * 请求数据
   */
  data?: RequestData

  /**
   * 请求参数
   */
  param?: RequestParam

  /**
   * MineType
   */
  contentType?: RequestContentType,

  /**
   * 鉴权
   */
  token?: string

  /**
   * 返回数据类型
   */
  dataType?: RequestDataType

  /**
   * 响应数据类型
   */
  responseType?: RequestResponseType

  /**
   * BaseUrl
   */
  baseUrl?: string

  /**
   * 鉴权名
   */
  tokenName?: string

  /**
   * 是否显示loading
   */
  loading?: boolean
}

/**
 * 请求类
 */
export class Request {

  /**
   * 默认配置
   * @private
   * @type {RequestOptions}
   * @memberof Request
   */
  private options: RequestOptions = {
    url: '',
    method: 'GET',
    contentType: RequestContentType.JSON,
    token: '',
    dataType: 'json',
    responseType: 'text',
    tokenName: 'Authorization',
    loading: true
  }

  /**
   * 构造方法
   * @param options                       RequestOptions
   */
  public constructor(options: RequestOptions) {
    this.init(options)
  }

  /**
   * 初始化
   * @param options                       RequestOptions
   */
  protected init(options: RequestOptions) {
    if (options.url) {
      if (!CommonUrlWorker.isProtocolExist(options.url)) {
        options.url = options.baseUrl ? options.baseUrl + options.url : options.url
      }
      if (options.param !== undefined) {
        if (options.url[options.url.length - 1] === '/') {
          options.url += options.param
        } else {
          options.url += '/' + options.param
        }
      }
    }
    CommonWorker.mergeToSource(this.options, options)
  }

  /**
   * 解析配置
   */
  protected resolveOptions(): any {
    let { url, method, data, contentType, token, dataType, responseType, tokenName } = this.options
    let finalOptions: any = { url, method, dataType, responseType }
    if (data !== undefined) {
      finalOptions = { ...finalOptions, data }
    }
    finalOptions = { ...finalOptions, header: { 'content-type': contentType } }
    finalOptions['header'][tokenName as string] = token
    return finalOptions
  }

  /**
   * 发送请求
   */
  public request(): Promise<any> {
    let params: any = this.resolveOptions()
    return new Promise((resolve, reject) => {
      Taro.request({
        ...params,
        success: (res) => resolve(res),
        fail: (err) => reject(err)
      })
    })
  }

  /**
   * 是否显示loading
   * @readonly
   * @type {boolean}
   * @memberof Request
   */
  public get loading(): boolean {
    return !!this.options.loading
  }
}