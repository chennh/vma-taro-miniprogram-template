import { StorageOptionsPresetType } from '@red-bean/red-bean'
import { AdapterStorage } from '@red-bean/red-bean-taro'

// Test Case 1    预置测试

export const storage = new AdapterStorage()

// export const storage = new AdapterStorage({
//   options: StorageOptionsPresetType.NORMAL
// })

// export const storage = new AdapterStorage({
//   options: StorageOptionsPresetType.MD5
// })

// export const storage = new AdapterStorage({
//   options: StorageOptionsPresetType.BASE64
// })

// export const storage = new AdapterStorage({
//   options: StorageOptionsPresetType.MD5_BASE64
// })

// export const storage = new AdapterStorage({
//   options: StorageOptionsPresetType.BASE64_DECODE
// })


// Test Case 2     两种基本用法测试

export const testStorage = new AdapterStorage({ name: 'test' })


// Test Case 3     session测试

// export const testStorage = new AdapterStorage({ name: 'test', isSession: true })


// 前提须知：
// 关于StorageOptionsPresetType，
// 预置StorageOptionsPresetType.NORMAL是啥都不做，原生
// 预置默认为StorageOptionsPresetType.JSON，只是单纯的json解析，没有使用编码
// 预置StorageOptionsPresetType.MD5只是单纯的md5，没有使用json解析，只编码不解码
// 预置StorageOptionsPresetType.BASE64只是单纯的base64，没有使用json解析，只编码不解码
// 预置StorageOptionsPresetType.MD5_BASE64是先进行md5再进行base64，没有使用json解析，只编码不解码
// 预置StorageOptionsPresetType.BASE64_DECODE是存的时候先进行序列化，再base64编码，取的时候是先base64解码，再反序列化


// 测试结果：

// 微信小程序：
// StorageOptionsPresetType.NORMAL          完美
// StorageOptionsPresetType.JSON            默认预置，NaN会转为null之外，其它都完美
// StorageOptionsPresetType.MD5             字符串会被md5之外，其它都按NORMAL来
// StorageOptionsPresetType.BASE64          字符串会被base64_encode之外，其它都按NORMAL来，空字符串编码之后还是空字符串
// StorageOptionsPresetType.MD5_BASE64      字符串会md5，后base64_encode之外，其它都按NORMAL来
// StorageOptionsPresetType.BASE64_DECODE   NaN会转为null之外，其它都完美

// 支付宝小程序
// StorageOptionsPresetType.NORMAL          NaN会转为null之外，其它都完美
// StorageOptionsPresetType.JSON            默认预置，NaN会转为null之外，其它都完美
// StorageOptionsPresetType.MD5             字符串会被md5之外，其它都按NORMAL来
// StorageOptionsPresetType.BASE64          字符串会被base64_encode之外，其它都按NORMAL来，空字符串编码之后还是空字符串
// StorageOptionsPresetType.MD5_BASE64      字符串会md5，后base64_encode之外，其它都按NORMAL来
// StorageOptionsPresetType.BASE64_DECODE   NaN会转为null之外，其它都完美

// h5
// StorageOptionsPresetType.NORMAL          字符串、数值、布尔值、null存的完美，返回都是字符串，数组存、取都是数组逗号拼接后的值，对象转为[object Object]的字符串
// StorageOptionsPresetType.JSON            默认预置，NaN会转为null之外，其它都完美
// StorageOptionsPresetType.MD5             字符串会被md5之外，其它都按NORMAL来
// StorageOptionsPresetType.BASE64          字符串会被base64_encode之外，其它都按NORMAL来，空字符串编码之后还是空字符串
// StorageOptionsPresetType.MD5_BASE64      字符串会md5，后base64_encode之外，其它都按NORMAL来
// StorageOptionsPresetType.BASE64_DECODE   NaN会转为null之外，其它都完美


// 综上所得，多端权衡之下，
// 默认预置使用StorageOptionsPresetType.JSON
// 需要加解密使用StorageOptionsPresetType.BASE64_DECODE
// 以下预置适用于加密字符串类型的值：
// StorageOptionsPresetType.MD5、StorageOptionsPresetType.BASE64、StorageOptionsPresetType.MD5_BASE64
// 有其它扩展，还需额外测试
// isSession仅对h5有用

// 20200212 默认预设修改为StorageOptionsPresetType.BASE64_DECODE
// 20200212 未来拓展 命名空间