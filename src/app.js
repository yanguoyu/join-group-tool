import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import WxGroupView from './pages/wx-group-view'

import configStore from './store'
import stateUpdateHelp from './shared/state-update-help';

import './app.less'

const store = configStore()
stateUpdateHelp();

// 由于小程序的限制 Flex 组件只能通过样式来完成
if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

class App extends Component {

  config = {
    pages: [
      'pages/wx-group-view/index',
      'pages/personal-center/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: "pages/wx-group-view/index",
        text: "首页",
        iconPath: "./assert/home.png",
        selectedIconPath: "./assert/home-hover.png"
      }, {
        pagePath: "pages/personal-center/index",
        text: "我",
        iconPath: "./assert/personal.png",
        selectedIconPath: "./assert/personal-hover.png"
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <WxGroupView />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
