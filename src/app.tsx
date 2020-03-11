import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import { 
  CommonWorker, 
  CommonFuncType,
  CommonMountFactory
} from '@red-bean/red-bean'
import { 
  TaroConfig, 
  TaroEnvType, 
  clearInterval
} from '@red-bean/red-bean-taro'

import Index from './pages/index'

import { store } from '@/store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')

// utils
import {
  RequestFactory,
  CommonSimpleRouteMethods,
  CommonSimpleScope,
  navigateTo,
  getSetting,
  login,
} from '@/utils'

// storages
import {
  tokenStorage,
  userInfoStorage,
  mobileStorage,
  loginInfoStorage,
  loginUserInfoStorage,
  tabBarInfoStorage
} from '@/storages'

// routes
import { RouteNames } from './routes'

// constants
import { CONSTANTS_LOGIN } from '@/constants'

const env = process.env.TARO_ENV

// 初始化red-bean-taro
TaroConfig.init({
  taro: Taro,
  env,
  wx: env === TaroEnvType.WEAPP ? wx : undefined,
  my: env === TaroEnvType.ALIPAY ? my : undefined,
})

// 设置token缓存
RequestFactory.setStorage(tokenStorage)

interface App {
  props: {}
  state: {}
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  constructor(props: any) {
    super(props)
    // 查看Demo去掉注释
    this.config = {
      pages: [
        'pages/demo/chart/index',
        'pages/demo/image/index',
        'pages/demo/common/index',
        'pages/demo/nav/index',
        'pages/demo/service/index',
        'pages/demo/cover/index',
        'pages/demo/webview/index',
        'pages/demo/mobx/index',
        'pages/demo/audio/index',
        'pages/demo/video/index',
        'pages/demo/interval/index',
        'pages/demo/storage/index'
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      navigateToMiniProgramAppIdList: [
        'wx794451f9a4fe0da2'
      ],
      tabBar: {
        color: '#999999',
        selectedColor: '#4A8BFA',
        backgroundColor: '#FFFFFF',
        list: [
          {
            pagePath: 'pages/demo/common/index',
            text: 'common'
          },
          {
            pagePath: 'pages/demo/nav/index',
            text: 'nav'
          },
          {
            pagePath: 'pages/demo/service/index',
            text: 'service'
          }
        ]
      }
    }
  }

  componentWillMount() {
    CommonMountFactory.mount(CONSTANTS_LOGIN.AUTHORIZE_CHECK, this.checkAuthorizeState)
    CommonMountFactory.mount(CONSTANTS_LOGIN.LOGIN_CHECK, this.checkLoginState)
  }

  componentDidMount() {
  }

  componentDidShow() { }

  componentDidHide() { }

  componentWillUnmount() {
    // 全局统一释放定时类资源
    clearInterval()
  }

  componentDidCatchError() { }

  /**
   * 检测登录状态
   * @memberof Index
   */
  checkLoginState = (self: any) => {
    let userInfo = userInfoStorage.get()
    if (!CommonWorker.isEmpty(userInfo)) {
      self && self.onAfterLogin && self.onAfterLogin()
      this.onAfterLogin()
    } else {
      // TODO 跳转到入口页
      // navigateTo({
      //   url: RouteNames.HOME,
      //   method: CommonSimpleRouteMethods.RELAUNCH
      // })
    }
  }

  /**
   * 检测授权状态
   * @memberof App
   */
  checkAuthorizeState = (self: any, fn: CommonFuncType) => {
    // getSetting().then((settingInfo) => {
    //   if (settingInfo[CommonSimpleScope.USER_INFO]) {
    //     let userInfo = userInfoStorage.get()
    //     if (!CommonWorker.isEmpty(userInfo)) {
    //       fn({ isLogin: false, isAuthorize: false })
    //       let { avatarUrl, nickName } = userInfo as any
    //       login().then(codeInfo => {
    //         let { code } = codeInfo
    //         if (code) {
    //           loginApi.login(code).then((loginInfo) => {
    //             loginInfoStorage.set(loginInfo)
    //             let { openid, mackey } = loginInfo
    //             tokenStorage.set(mackey || '')
    //             if (!mackey) {
    //               loginApi.register({
    //                 phone: '',
    //                 wx_nick: nickName,
    //                 wx_open_id: openid,
    //                 wx_portrait: avatarUrl
    //               }).then((loginUserInfo) => {
    //                 let { mac_key } = loginUserInfo
    //                 tokenStorage.set(mac_key || '')
    //                 loginUserInfoStorage.set(loginUserInfo)
    //                 self && self.onAfterLogin && self.onAfterLogin()
    //                 this.onAfterLogin()
    //               })
    //             } else {
    //               loginApi.getUserInfo().then((loginUserInfo) => {
    //                 let { mac_key } = loginUserInfo
    //                 tokenStorage.set(mac_key || '')
    //                 loginUserInfoStorage.set(loginUserInfo)
    //                 self && self.onAfterLogin && self.onAfterLogin()
    //                 this.onAfterLogin()
    //               })
    //             }
    //           })
    //         }
    //       })
    //     } else {
    //       fn({ isLogin: true, isAuthorize: false })
    //     }
    //   } else {
    //     fn({ isLogin: true, isAuthorize: false })
    //   }
    // })
  }

  /**
   * 登录之后
   * @memberof App
   */
  onAfterLogin = () => {
    // TODO
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
