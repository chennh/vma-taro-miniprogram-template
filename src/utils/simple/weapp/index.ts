import Taro from '@tarojs/taro'
import {
  CommonObjectType
} from '@red-bean/red-bean'
import {
  CommonSimpleWorker,
  CommonSimpleRouteParams,
  CommonSimpleShowToastParams,
  CommonSimpleChooseImageParams,
  CommonSimpleChooseImageResult,
  CommonSimpleFileType,
  CommonSimplePaymentParams
 } from '../../common'

/**
 * 路由跳转
 * @param args                    CommonSimpleRouteParams
 * @param self                    页面引用
 */
export const navigateTo = (args: CommonSimpleRouteParams): any => {
  return CommonSimpleWorker.navigateTo(args)
}

/**
 * 页面返回
 * @param delta                   页面栈数
 */
export const navigateBack = (delta: number = 1): any => {
  return CommonSimpleWorker.navigateBack(delta)
}

/**
 * 获取query方式传值的数据
 * @param self                    页面引用
 */
export const getParamsData = (self: any): CommonObjectType => {
  return CommonSimpleWorker.getParamsData(self)
}

/**
 * 获取preload方式传值的数据
 * @param self                    页面引用
 */
export const getPreloadData = (self: any): CommonObjectType => {
  return CommonSimpleWorker.getPreloadData(self)
}

/**
 * TODO 获取场景值
 * @param self                    页面引用
 */
export const getSceneData = (self: any): CommonObjectType => {
  return {}
}

/**
 * 提示
 * @param params                 CommonSimpleShowToastParams
 */
export const showToast = (params: CommonSimpleShowToastParams): Promise<any> => {
  return CommonSimpleWorker.showToast(params)
}

/**
 * 显示加载
 * @param title                  显示的内容
 */
export const showLoading = (title: string = ''): Promise<any> => {
  return CommonSimpleWorker.showLoading(title)
}

/**
 * 隐藏加载
 */
export const hideLoading = (): Promise<any> => {
  return CommonSimpleWorker.hideLoading()
}

/**
 * 跳转到小程序
 * @param appId                  appid
 * @param path                   路径
 */
export const navigateToMiniProgram = (appId: string, path: string) => {
  return CommonSimpleWorker.navigateToMiniProgram(appId, path)
}

/**
 * 设置剪贴板内容
 * @param data                   内容
 */
export const setClipboardData = (data: string) => {
  return CommonSimpleWorker.setClipboardData(data)
}

/**
 * 获取剪贴板内容
 */
export const getClipboardData = () => {
  return CommonSimpleWorker.getClipboardData()
}

/**
 * 打call
 * @param phoneNumber           电话号码
 */
export const makePhoneCall = (phoneNumber: string) => {
  return CommonSimpleWorker.makePhoneCall(phoneNumber)
}

/**
 * 长振动
 */
export const vibrateLong = () => {
  return CommonSimpleWorker.vibrateLong()
}

/**
 * 短振动
 */
export const vibrateShort = () => {
  return CommonSimpleWorker.vibrateShort()
}

/**
 * 获取系统信息
 */
export const getSystemInfo = (): any => {
  return CommonSimpleWorker.getSystemInfo()
}

/**
 * 显示导航条loading
 */
export const showNavigationBarLoading = () => {
  return CommonSimpleWorker.showNavigationBarLoading()
}

/**
 * 隐藏导航条loading
 */
export const hideNavigationBarLoading = () => {
  return CommonSimpleWorker.hideNavigationBarLoading()
}

/**
 * 设置页面标题
 * @param title                  标题内容
 */
export const setNavigationBarTitle = (title: string) => {
  return CommonSimpleWorker.setNavigationBarTitle(title)
}

/**
 * 滚动到目标位置
 * @param scrollTop              距顶部距离
 */
export const pageScrollTo = (scrollTop: number) => {
  return CommonSimpleWorker.pageScrollTo(scrollTop)
}

/**
 * 调用接口获取登录凭证code
 */
export const login = (): Promise<any> => {
  return CommonSimpleWorker.login()
}

/**
 * 获取用户信息
 */
export const getUserInfo = (): Promise<any> => {
  return CommonSimpleWorker.getUserInfo()
}

/**
 * 预览图片
 * @param url                    图片url
 */
export const previewImage = (url: string) => {
  return CommonSimpleWorker.previewImage(url)
}

/**
 * 创建一个SelectorQuery对象实例
 */
export const createSelectorQuery = (): Taro.SelectorQuery => {
  return CommonSimpleWorker.createSelectorQuery()
}

/**
 * 创建画布上下文
 * @param canvasId                  画布ID
 * @param self                      页面或组件引用
 */
export const createCanvasContext = (canvasId: string, self: any): any => {
  return CommonSimpleWorker.createCanvasContext(canvasId, self)
}

/**
 * 保存图片
 * @param url                       图片url
 * @param isLocal                   是否是本地图片
 */
export const writePhotosAlbum = (url: string, isLocal: boolean = false) => {
  return CommonSimpleWorker.writePhotosAlbum(url, isLocal)
}

/**
 * 复制
 * @param content                   被复制的内容
 * @param showToast                 是否显示Toast
 */
export const copy = (content: string, showToast: boolean = true) => {
  return CommonSimpleWorker.copy(content, showToast)
}

/**
 * 获取用户当前设置
 */
export const getSetting = () => {
  return CommonSimpleWorker.getSetting()
}

/**
 * 获取授权后的用户信息
 * @param e 
 */
export const getUserInfoAfterAuthorize = (e: any): CommonObjectType => {
  return e &&e.detail && e.detail.userInfo ? e.detail.userInfo : {}
}

/**
 * 选择图片
 * @param params                    CommonSimpleChooseImageParams
 */
export const chooseImage = (params?: CommonSimpleChooseImageParams): Promise<CommonSimpleChooseImageResult> => {
  return CommonSimpleWorker.chooseImage(params)
}

/**
 * openDocumentAfterDownload
 * @param url                       文档链接
 * @param fileType                  文件类型
 */
export const openDocumentAfterDownload = (url: string, fileType: CommonSimpleFileType = 'pdf') => {
  return CommonSimpleWorker.openDocumentAfterDownload(url, fileType)
}

/**
 * 发起支付
 * @param params                    CommonSimplePaymentParams
 */
export const requestPayment = (params: CommonSimplePaymentParams) => {
  return CommonSimpleWorker.requestPayment(params)
}

/**
 * 开始下拉刷新
 */
export const startPullDownRefresh = () => {
  return CommonSimpleWorker.startPullDownRefresh()
}

/**
 * 结束下拉刷新
 */
export const stopPullDownRefresh = () => {
  return CommonSimpleWorker.stopPullDownRefresh()
}

/**
 * 是否是小屏幕
 */
export const isSmallScreen = () => {
  let { screenWidth } = getSystemInfo()
  return screenWidth <= 330
}