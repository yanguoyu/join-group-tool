import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

class PersonalCenter extends Component {

    config = {
    navigationBarTitleText: '个人中心'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        test
     </View>
    )
  }
}

export default PersonalCenter
