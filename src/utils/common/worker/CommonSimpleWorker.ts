import Taro from '@tarojs/taro'
import {
  CommonObjectType,
  CommonWorker
} from '@red-bean/red-bean'
import { 
  setTimeout 
} from '@red-bean/red-bean-taro'

/**
 * 支付相关参数
 */
export interface CommonSimplePaymentParams {
  timeStamp: string
  nonceStr: string
  package: string
  signType: 'MD5' | 'HMAC-SHA256'
  paySign: string
}

/**
 * 允许的打开的文件类型
 */
export type CommonSimpleFileType = 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'pdf' 

/**
 * scope列表
 */
export enum CommonSimpleScope {
  USER_INFO = 'scope.userInfo',
  USER_LOCATION = 'scope.userLocation',
  USER_LOCATION_BACKGROUND = 'scope.userLocationBackground',
  ADDRESS = 'scope.address',
  INVOICE_TITLE = 'scope.invoiceTitle',
  INVOICE = 'scope.invoice',
  WE_RUN = 'scope.werun',
  RECORD = 'scope.record',
  WRITE_PHOTOS_ALBUM = 'scope.writePhotosAlbum',
  CAMERA = 'scope.camera'
}

/**
 * CommonSimpleRouteMethods
 */
export enum CommonSimpleRouteMethods {
  NAVIGATE_TO = 'navigateTo',
  REDIRECT_TO = 'redirectTo',
  SWITCH_TAB = 'switchTab',
  RELAUNCH = 'reLaunch'
}

/**
 * CommonSimpleRoutePreload
 */
export interface CommonSimpleRoutePreload {
  key: string
  data: any
}

/**
 * CommonSimpleRouteParams
 */
export interface CommonSimpleRouteParams {

  /**
   * 路由路径
   */
  url: string

  /**
   * 路由参数
   */
  params?: CommonObjectType

  /**
   * 路由方法
   */
  method?: CommonSimpleRouteMethods

  /**
   * preload传值
   */
  preload?: CommonSimpleRoutePreload

  /**
   * 页面引用
   */
  self?: any
}

/**
 * CommonSimpleChooseImageSizeType
 */
export type CommonSimpleChooseImageSizeType = 'original' | 'compressed'

/**
 * CommonSimpleChooseImageSourceType
 */
export type CommonSimpleChooseImageSourceType = 'album' | 'camera'

/**
 * CommonSimpleChooseImageParams
 */
export interface CommonSimpleChooseImageParams {

  /**
   * 图片张数
   */
  count?: number

  /**
   * 图片类型
   */
  sizeType?: CommonSimpleChooseImageSizeType[]

  /**
   * 选择源类型
   */
  sourceType?: CommonSimpleChooseImageSourceType[]
}

/**
 * CommonSimpleChooseImageTempFiles
 */
export interface CommonSimpleChooseImageTempFiles {
  path: string
  size: number
}


/**
 * CommonSimpleChooseImageResult
 */
export interface CommonSimpleChooseImageResult {
  tempFilePaths: string[]
  tempFiles: CommonSimpleChooseImageTempFiles[]
}

/**
 * CommonSimpleChooseVideoParams
 */
export interface CommonSimpleChooseVideoParams {
  sourceType?: string[]
  compressed?: boolean
  maxDuration?: number
}

/**
 * CommonSimpleChooseVideoResult
 */
export interface CommonSimpleChooseVideoResult {
  tempFilePath: string
  duration: number
  size: number
  height: number
  width: number
}

/**
 * CommonSimpleGetLocationParams
 */
export interface CommonSimpleGetLocationParams {
  type?: 'wgs84' | 'gcj02'
}

/**
 * CommonSimpleGetLocationResult
 */
export interface CommonSimpleGetLocationResult {
  latitude: number
  longitude: number
  speed: number
  accuracy: number
  altitude: number
  verticalAccuracy: number
  horizontalAccuracy: number
}

/**
 * CommonSimpleShowModalParams
 */
export interface CommonSimpleShowModalParams {
  content: string,
  title?: string,
  showCancel?: boolean,
  cancelText?: string,
  cancelColor?: string,
  confirmText?: string,
  confirmColor?: string,
}

/**
 * CommonSimpleShowToastParams
 */
export interface CommonSimpleShowToastParams {
  title: string
  icon?: 'success' | 'loading' | 'none'
  duration?: number
}

/**
 * CommonSimpleChooseLocationParams
 */
export interface CommonSimpleChooseLocationParams {
  latitude?: number
  longitude?: number
}

/**
 * CommonSimpleChooseLocationResult
 */
export interface CommonSimpleChooseLocationResult {
  name: string
  address: string
  latitude: number
  longitude: number
}

/**
 * CommonSimpleOpenLocationParams
 */
export interface CommonSimpleOpenLocationParams {
  latitude: number
  longitude: number
  scale?: number
  name?: string
  address?: string
}

/**
 * CommonSimpleWorker
 */
export class CommonSimpleWorker {

  /**
   * 保存图片状态
   * @static
   * @type {boolean}
   * @memberof CommonSimpleWorker
   */
  public static writePhotosAlbumState: boolean | null = null

  /**
   * 路由跳转
   * @static
   * @memberof CommonSimpleWorker
   * 
   * 注：wx.switchTab: url 不支持 queryString，页面第一次创建才取得到值
   */
  public static navigateTo = (args: CommonSimpleRouteParams) => {
    if (!CommonWorker.isEmpty(args.params)) {
      args.url += '?' + CommonWorker.join(args.params as any)
    }
    if (args.self && args.preload) {
      let { key, data } = args.preload
      args.self.$preload(key, data)
    }
    args.method = args.method || CommonSimpleRouteMethods.NAVIGATE_TO
    return Taro[args.method]({ url: args.url })
  }

  /**
   * 获取params方式传值的数据
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getParamsData = (self: any): CommonObjectType => {
    return self.$router.params
  }

  /**
   * 获取preload方式传值的数据
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getPreloadData = (self: any): CommonObjectType => {
    return self.$router.preload || {}
  }

  /**
   * 页面返回
   * @static
   * @memberof CommonSimpleWorker
   */
  public static navigateBack = (delta: number = 1) => {
    delta = Math.floor(delta)
    delta = delta < 0 ? 1 : delta
    return Taro.navigateBack({ delta })
  }

  /**
   * 选择图片
   * @static
   * @memberof CommonSimpleWorker
   */
  public static chooseImage = (params?: CommonSimpleChooseImageParams): Promise<CommonSimpleChooseImageResult> => {
    let defaultParams: CommonSimpleChooseImageParams = {
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    }
    if (params && params.count !== undefined) {
      params.count = Math.floor(params.count)
      params.count = params.count < 0 ? defaultParams.count : params.count
    }
    params = params ? CommonWorker.merge(defaultParams, params) : defaultParams
    return Taro.chooseImage({ ...params })
  }

  /**
   * 预览图片
   * @static
   * @memberof CommonSimpleWorker
   */
  public static previewImage = (url: string): Promise<any> => {
    return Taro.previewImage({
      urls: [url],
      current: url
    })
  }

  /**
   * 选择视频
   * @static
   * @memberof CommonSimpleWorker
   */
  public static chooseVideo = (params?: CommonSimpleChooseVideoParams): Promise<any> => {
    let defaultParams: CommonSimpleChooseVideoParams = {
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60
    }
    params = params ? CommonWorker.merge(defaultParams, params) : defaultParams
    let tmpParams = params as CommonObjectType
    return Taro.chooseVideo({ ...tmpParams })
  }

  /**
   * 提示
   * @static
   * @memberof CommonSimpleWorker
   */
  public static showToast = (params: CommonSimpleShowToastParams): Promise<any> => {
    let defaultParams: CommonSimpleShowToastParams = {
      title: '',
      icon: 'none',
      duration: 3000
    }
    if (params.duration !== undefined) {
      params.duration = Math.floor(params.duration)
      params.duration = params.duration < 0 ? defaultParams.duration : params.duration
    }
    params = CommonWorker.merge(defaultParams, params) as CommonSimpleShowToastParams
    return new Promise((resolve) => {
      Taro.showToast({ ...params })
      resolve && setTimeout(() => resolve && resolve(), params.duration)
    })
  }

  /**
   * 显示模态框
   * @static
   * @memberof CommonSimpleWorker
   */
  public static showModal = (params: CommonSimpleShowModalParams) => {
    let defaultParams: CommonSimpleShowModalParams = {
      title: '提示',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#576B95'
    }
    defaultParams = CommonWorker.merge(defaultParams, params) as CommonSimpleShowModalParams
    return new Promise((resolve, reject) => {
      Taro.showModal({ ...defaultParams }).then((res) => {
        if (res.confirm) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  /**
   * 获取地理位置
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getLocation = (params?: CommonSimpleGetLocationParams): Promise<CommonSimpleGetLocationResult> => {
    let defaultParams: CommonSimpleGetLocationParams = {
      type: 'gcj02'
    }
    params = params ? CommonWorker.merge(defaultParams, params) : defaultParams
    return Taro.getLocation({ ...params })
  }

  /**
   * 选择地理位置
   * @static
   * @memberof CommonSimpleWorker
   */
  public static chooseLocation = (params?: CommonSimpleChooseLocationParams): Promise<any> => {
    let tmpParams = params as CommonObjectType
    return params ? Taro.chooseLocation({ ...tmpParams }) : Taro.chooseLocation({})
  }

  /**
   * 开启地理位置
   * @static
   * @memberof CommonSimpleWorker
   */
  public static openLocation = (params: CommonSimpleOpenLocationParams): Promise<any> => {
    let defaultParams: CommonSimpleOpenLocationParams = {
      latitude: 0,
      longitude: 0,
      scale: 18
    }
    if (params.latitude !== undefined) {
      params.latitude = params.latitude > 90 ? 90 : (params.latitude < -90 ? -90 : params.latitude)
    }
    if (params.longitude !== undefined) {
      params.longitude = params.longitude > 180 ? 180 : (params.longitude < -180 ? -180 : params.longitude)
    }
    if (params.scale !== undefined) {
      params.scale = Math.floor(params.scale)
      params.scale = params.scale > 18 ? 18 : (params.scale < 5 ? 5 : params.scale)
    }
    params = CommonWorker.merge(defaultParams, params) as CommonSimpleOpenLocationParams
    return Taro.openLocation({ ...params })
  }

  /**
   * 显示加载
   * @static
   * @memberof CommonSimpleWorker
   */
  public static showLoading = (title: string = ''): Promise<any> => {
    return new Promise((resolve) => {
      Taro.showLoading({ title })
      resolve()
    })
  }

  /**
   * 隐藏加载
   * @static
   * @memberof CommonSimpleWorker
   */
  public static hideLoading = (): Promise<any> => {
    return new Promise((resolve) => {
      Taro.hideLoading()
      resolve()
    })
  }

  /**
   * 跳转到小程序
   * @static
   * @memberof CommonSimpleWorker
   */
  public static navigateToMiniProgram = (appId: string, path: string) => {
    return Taro.navigateToMiniProgram({ appId, path })
  }

  /**
   * 设置剪贴板内容
   * @static
   * @memberof CommonSimpleWorker
   */
  public static setClipboardData = (data: string, showToast: boolean = true) => {
    return Taro.setClipboardData({ data, success: () => {
      !showToast && Taro.hideToast()
    }})
  }

  /**
   * 获取剪贴板内容
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getClipboardData = () => {
    return Taro.getClipboardData()
  }

  /**
   * 打call
   * @static
   * @memberof CommonSimpleWorker
   */
  public static makePhoneCall = (phoneNumber: string) => {
    return Taro.makePhoneCall({ phoneNumber })
  }

  /**
   * 长振动
   * @static
   * @memberof CommonSimpleWorker
   */
  public static vibrateLong = () => {
    return Taro.vibrateLong()
  }

  /**
   * 短振动
   * @static
   * @memberof CommonSimpleWorker
   */
  public static vibrateShort = () => {
    return Taro.vibrateShort()
  }

  /**
   * 获取系统信息
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getSystemInfo = (): any => {
    return Taro.getSystemInfoSync()
  }

  /**
   * 显示导航条loading
   * @static
   * @memberof CommonSimpleWorker
   */
  public static showNavigationBarLoading = () => {
    return Taro.showNavigationBarLoading()
  }

  /**
   * 隐藏导航条loading
   * @static
   * @memberof CommonSimpleWorker
   */
  public static hideNavigationBarLoading = () => {
    return Taro.hideNavigationBarLoading()
  }

  /**
   * 设置页面标题
   * @static
   * @memberof CommonSimpleWorker
   */
  public static setNavigationBarTitle = (title: string) => {
    return Taro.setNavigationBarTitle({ title })
  }

  /**
   * 滚动到目标位置
   * @static
   * @memberof CommonSimpleWorker
   */
  public static pageScrollTo = (scrollTop: number, duration: number = 300) => {
    return Taro.pageScrollTo({ scrollTop, duration })
  }

  /**
   * TODO 获取页面高度
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getPageHeight = (): number => {
    return -1
  }

  /**
   * 调用接口获取登录凭证code
   * @static
   * @memberof CommonSimpleWorker
   */
  public static login = (): Promise<any> => {
    return Taro.login()
  }

  /**
   * 获取用户信息
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getUserInfo = (): Promise<any> => {
    return Taro.getUserInfo()
  }

  /**
   * 创建一个SelectorQuery对象实例
   * @static
   * @memberof CommonSimpleWorker
   */
  public static createSelectorQuery = (): Taro.SelectorQuery => {
    return Taro.createSelectorQuery()
  }

  /**
   * 获取画布上下文
   * @static
   * @memberof CommonSimpleWorker
   */
  public static createCanvasContext = (canvasId: string, self: any): any => {
    return Taro.createCanvasContext(canvasId, self.$scope)
  }

  /**
   * 获取用户当前设置
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getSetting = (): Promise<any> => {
    return Taro.getSetting().then(res => {
      let { authSetting } = res
      return authSetting ? authSetting : {}
    })
  }

  /**
   * 用户授权
   * @static
   * @memberof CommonSimpleWorker
   */
  public static authorize = (scope: CommonSimpleScope) => {
    return Taro.authorize({ scope })
  }

  /**
   * 下载文件
   * @static
   * @memberof CommonSimpleWorkers
   */
  public static downloadFile = (url: string, header?: CommonObjectType): any => {
    return header ? Taro.downloadFile({ url, header }) : Taro.downloadFile({ url })
  }

  /**
   * 获取图片信息
   * @static
   * @memberof CommonSimpleWorker
   */
  public static getImageInfo = (url: string) => {
    return Taro.getImageInfo({ src: url })
  }

  /**
   * 图片文件路径，可以是临时文件路径或永久文件路径 (本地路径) ，不支持网络路径
   * @static
   * @memberof CommonSimpleWorker
   */
  public static saveImageToPhotosAlbum = (filePath: string) => {
    return Taro.saveImageToPhotosAlbum({ filePath })
  }

  /**
   * 开启设置
   * @static
   * @memberof CommonSimpleWorker
   */
  public static openSetting = () => {
    return Taro.openSetting()
  }

  /**
   * 分流保存图片
   * @static
   * @memberof CommonSimpleWorker
   */
  public static flowWritePhotosAlbum = (url: string, isLocal: boolean) => {
    if (isLocal) {
      CommonSimpleWorker.getImageInfo(url).then((res: any) => {
        let { filePath } = res
        if (filePath) {
          CommonSimpleWorker.saveImageToPhotosAlbum(filePath)
          CommonSimpleWorker.showToast({ title: '图片保存成功'})
        }
      }).catch((err) => {
        // console.log(err)
        CommonSimpleWorker.showModal({ content: '图片读取失败'})
      })
    } else {
      let promise: any = CommonSimpleWorker.downloadFile(url)
      promise.then((res: any) => {
        let { tempFilePath } = res
        if (tempFilePath) {
          CommonSimpleWorker.saveImageToPhotosAlbum(tempFilePath)
          CommonSimpleWorker.showToast({ title: '图片保存成功'})
        }
      }).catch((err) => {
        // console.log(err)
        CommonSimpleWorker.showModal({ content: '图片下载失败'})
      })
    }
  }

  /**
   * 保存图片
   * @static
   * @memberof CommonSimpleWorker
   */
  public static writePhotosAlbum = (url: string, isLocal: boolean) => {
    CommonSimpleWorker.getSetting().then((res) => {
      if (CommonSimpleWorker[CommonSimpleScope.WRITE_PHOTOS_ALBUM]) {
        CommonSimpleWorker.flowWritePhotosAlbum(url, isLocal)
      } else {
        CommonSimpleWorker.authorize(CommonSimpleScope.WRITE_PHOTOS_ALBUM).then((res) => {
          CommonSimpleWorker.flowWritePhotosAlbum(url, isLocal)
        }).catch((err) => {
          if (CommonSimpleWorker.writePhotosAlbumState === null) {
            CommonSimpleWorker.writePhotosAlbumState = false
          } else {
            CommonSimpleWorker.showModal({ content: '检测到未授权，是否打开设置页？' }).then(() => {
              CommonSimpleWorker.openSetting().then((res) => {
                let { authSetting } = res
                if (authSetting && authSetting[CommonSimpleScope.WRITE_PHOTOS_ALBUM]) {
                  CommonSimpleWorker.flowWritePhotosAlbum(url, isLocal)
                }
              })
            })
          }
        })
      }
    })
  }

  /**
   * 复制
   * @static
   * @memberof CommonSimpleWorker
   */
  public static copy = (content: string, showToast: boolean = true) => {
    CommonSimpleWorker.setClipboardData(content, showToast)
  }

  /**
   * 打开文档
   * @static
   * @memberof CommonSimpleWorker
   */
  public static openDocument = (filePath: string, fileType: CommonSimpleFileType = 'pdf') => {
    return Taro.openDocument({
      filePath,
      fileType
    })
  }

  /**
   * 打开下载下来的文档
   * @static
   * @memberof CommonSimpleWorker
   */
  public static openDocumentAfterDownload = (url: string, fileType: CommonSimpleFileType = 'pdf') => {
    CommonSimpleWorker.downloadFile(url).then((response) => {
      let { filePath, tempFilePath } = response
      if (filePath) {
        CommonSimpleWorker.openDocument(filePath)
      }
    })
  }

  /**
   * 发起支付
   * @static
   * @memberof CommonSimpleWorker
   */
  public static requestPayment = (params: CommonSimplePaymentParams) => {
    let { timeStamp, nonceStr, signType, paySign } = params
    signType = signType ? signType : 'MD5'
    return Taro.requestPayment({ timeStamp, nonceStr, package: params.package, signType, paySign })
  }

  /**
   * 开始下拉刷新
   */
  public static startPullDownRefresh = () => {
    return Taro.startPullDownRefresh()
  }

  /**
   * 结束下拉刷新
   */
  public static stopPullDownRefresh = () => {
    return Taro.stopPullDownRefresh()
  }
}