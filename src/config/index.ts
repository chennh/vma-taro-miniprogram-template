import ImageDefault from '@/assets/images/common/default-avatar.png'
import ImageDataNo from '@/assets/images/common/no-data@2x.png'

// 图片BaseUrl
export const IMG_BASE_URL = process.env.IMG_BASE_URL || ''
// 接口BaseUrl
export const API_BASE_URL = process.env.API_BASE_URL || ''
// 请求最大数
export const REQUEST_MAX_NUM = 10
// 请求loading提示
export const REQUEST_TIP = '网络请求中'
// 请求失败提示
export const REQUEST_FAIL_TIP = '请求失败，请检查网络'
// 是否开启请求打印
export const REQUEST_IS_LOG_OPEN = false
// 是否开启请求超时报错打印
export const REQUEST_IS_TIMEOUT_ERROR_OPEN = true
// 是否开启拦截
export const REQUEST_IS_INTERCEPTOR_OPEN = true
// 默认图片
export const IMG_DEFAULT_COMMON = ImageDefault
// 默认头像
export const IMG_DEFAULT_AVATAR = ImageDefault
// 无数据图片
export const IMG_NO_DATA = ImageDataNo
// 页面出现悬浮按钮的滑动距离
export const SCROLL_TOP_WHEN_FLOAT_BTN_SHOW = 1000
// 是否开始模拟数据
export const IS_OPEN_MOCK = true
// 模拟数据使用的图片链接
export const MOCK_IMG_URL = 'https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLCqbJQ2uTFh3DEUoILr8ZhES5LIlms1Zzhg67AGtmlGFzp2Uh0pjVDuYSQgfcpibicl81VbFGN7meaw/132'