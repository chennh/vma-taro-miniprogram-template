import { StorageOptionsPresetType } from '@red-bean/red-bean' 
import { AdapterStorage } from '@red-bean/red-bean-taro'
import { StorageNames } from './names'

/**
 * tokenStorage
 * 用于缓存鉴权信息
 */
export const tokenStorage = new AdapterStorage({ 
  name: StorageNames.TOKEN
})

/**
 * userInfoStorage
 * 用于缓存授权登录后获取的用户信息
 */
export const userInfoStorage = new AdapterStorage({
  name: StorageNames.USER_INFO
})

/**
 * mobileStorage
 * 用于缓存用户手机号
 */
export const mobileStorage = new AdapterStorage({
  name: StorageNames.MOBILE
})

/**
 * loginInfoStorage
 * 用于缓存登录信息
 */
export const loginInfoStorage = new AdapterStorage({
  name: StorageNames.LOGIN_INFO
})

/**
 * loginUserInfoStorage
 * 用于缓存登录后获取的用户信息
 */
export const loginUserInfoStorage = new AdapterStorage({
  name: StorageNames.LOGIN_USER_INFO
})

/**
 * tabBarInfoStorage
 * 用于缓存TabBar配置信息
 */
export const tabBarInfoStorage = new AdapterStorage({
  name: StorageNames.TAB_BAR_INFO
})