import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { getUserInfo } from '../../actions/personal-center'

import './index.less'

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo
}), (dispatch) => ({
  getUserInfo() {
    dispatch(getUserInfo())
  }
}))
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
    const { userInfo } = this.props;
    return (
      <View className='user-info'>
        <View className='use-pic'>
          {
            userInfo?
            <AtAvatar image='https://jdc.jd.com/img/200'></AtAvatar>:
            <AtAvatar image='../../assert/not-login.png'></AtAvatar>
          }
        </View>
        <View className='use-name'>B</View>
      </View>
    )
  }
}

export default PersonalCenter
