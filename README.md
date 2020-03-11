<br />

## 本项目使用Taro、Taro ui框架开发，定位产品：微信小程序

<br />

### 涉及技术：

**Taro、TypeScript、Sass、Mobx、Jest**

<br />

### 资源链接：

**1 taro**

<https://taro-docs.jd.com/taro/docs/README.html>

**2 taro-ui**

<https://taro-ui.jd.com/#/docs/introduction>

**3 @red-bean/red-bean**

<https://gitee.com/jennis/red-bean>

**4 @red-bean/red-bean-taro**

<https://gitee.com/jennis/red-bean-taro>

<br />

### 项目说明：

**1 Git**

**1.1 采用git flow规范，第一个版本在master分支上编辑**

**2 样式，例如**

```scss
@import "../../../assets/scss/mixins.scss";
@import "../../../assets/theme/index.scss";

$style-head: xxx;

.#{$style-head} {

  &__inner {

    &--reversed {}

    &.active {}

    &:active {}
  }
}
```

**2.1 样式遵照BEM规范**

**2.2 一个页面配置一个$style-head**

**2.3 单位使用px**

**2.4 视觉稿调到750**

​	 **JS代码中，视觉稿上标的尺寸除以2为样式的尺寸，可以使用CommonStyleWorker类的px2n()方法进行转换**

​	 **CSS代码中，视觉稿上标的尺寸即为样式的尺寸，可以使用mixins中的px2n()函数进行转换**

​	 **为方便使用，mixins中还封装了其它mixins**

**2.5 theme为颜色库，页面、组件都需单独引入**

**2.6 mixins为mixins库，页面、组件都需单独引入**

**2.7 全局样式库，组件内部需单独引入**

**常见全局样式：**

```scss
.pl-30 { 
    padding-left: px2n(30); 
}
.mt-10 { 
    margin-top: px2n(30); 
}
.plr-40 { 
    padding-left: px2n(40); 
    padding-right: px2n(40); 
}
.box { 
    box-sizing: border-box; 
}
.align-center {
  	display: flex;
  	align-items: center;
    justify-content: center;
  	flex-wrap: wrap;
}
```

**3 页面、组件**

**3.1 react中页面、组件是用一个概念，采用同一套模板，在src/components/template/***

**3.2 事件名称采用on开头的小驼峰形式，采用箭头函数**

```tsx
onPlay = () => {}
```

**4 项目结构**

```js
config/								    // taro配置目录
dist/weapp/								// 微信小程序运行目录
node_modules/							// npm包目录
src/								    // 项目主要目录
	api/						  		// 接口请求相关
	assets/								// 图片、样式等静态资源目录
    	theme/							// 全局主题样式
    	scss/							// 全局样式库
    	images/							// 静态图片
	components/							// 组件目录
        common/							// 公共组件
	    template/						// 页面或组件模板
	config/							    // 配置目录
	constants/						    // 全局常量目录
	pages/							    // 页面目录，可定义局部的constants、components等目录
        demo/						     // 示例
	routes/							    // 路由目录
    	names/							// 路由命名管理目录
	storages/						    // 缓存目录
        names/						     // 缓存命名管理目录
	store/							    // 状态管理器，使用mobx
	utils/							    // 工具库
	app.scss						    // 全局样式
    app.tsx							    // 入口组件
    index.html						    // html模板
...									   // 配置文件、README文件、全局声明文件等
```

**注：页面采用扁平化结构组织，如**

```js
pages/
    learning/
    	index/
    		*.(tsx|scss|d.ts)
		course/
            *.(tsx|scss|d.ts)
		...
```

**5 模板集成须知**

**5.1 配置**

**config/dev.js、config/build.js中配置接口BaseUrl和图片BaseUrl等**

**config/index.js、package.json、project.config.json需更新下项目名称**

**project.config.json需填入有效的appid**

**config/index.js、tsconfig.json中配置alias**

**5.2 富文本**

**<https://taro-ext.jd.com/plugin/view/5d3185459b6a1d402778013d>**

**5.3 其它插件**

**优先在Taro 物料市场中寻找，https://taro-ext.jd.com/**

**5.4 后续集成目标**

**TabBar配置化**

**下拉刷新**

**触底刷新**

**自定义导航栏**

**生成海报**

**Sass变量自动转化为js变量**

**服务器部署自动跳转到等待页**

**组件升级封装**

**网络请求升级封装**

**咨询**

<br />

<br />

**模板尚在升级中，任重道远，happy ending~**

<br />