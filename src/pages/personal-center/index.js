import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import AV from '../../shared/av-weapp-min'
import { getUserInfo } from '../../actions/personal-center'
import './index.less'

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo
}), (dispatch) => ({
  getUserInfo(userInfo) {
    dispatch(getUserInfo(userInfo))
  }
}))
class PersonalCenter extends Component {

  config = {
    navigationBarTitleText: '个人中心',
  }

  constructor() {
    this.state = {};
  }

  changeUserInfo = ({ detail } = {}) => {
    const userInfo = detail ? detail.userInfo : undefined;
    AV.User.loginWithWeapp().then(user => {
      this.props.getUserInfo({
        ...userInfo,
        ...user.toJSON(),
      });
    });
  }

  uploadQrcode = () => {
    Taro.navigateTo({
      url: '/pages/personal-center/upload-qrcode'
    })
  }

  watchMyCode = () => {
    if(this.props.userInfo && this.props.userInfo.objectId) {
      Taro.navigateTo({
        url: '/pages/personal-center/my-qrcode'
      })
    } else {
      Taro.showToast({
        title: '请登陆后操作',
        icon: 'none',
        duration: 1000
      })
    }
  }

  loginOut = () => {
    AV.User.logOut();
    this.props.getUserInfo(null);
  }

  render () {
    const { userInfo } = this.props;
    return (
      <View>
        <View className='user-info'>
          <View className='use-pic'>
            {
              userInfo ?
              <Image src={userInfo.avatarUrl}></Image> :
              <Image src='/assert/not-login.png'></Image>
            }
          </View>
          <View className='use-name'>
            {
              !userInfo ?
              <Button
                plain
                hover-class='none'
                open-type='getUserInfo'
                onGetUserInfo={this.changeUserInfo}
              >
                登陆
              </Button> :
              <View>
                <View>
                  昵称：{userInfo.nickName}
                </View>
              </View>
            }
          </View>
        </View>
        <View  className='borad'>
          <View onClick={this.watchMyCode} className='list'>
            <View>
              <AtIcon value='bullet-list' size='24' color='#595959'></AtIcon>
              <View>查看我的二维码</View>
            </View>
            <AtIcon value='chevron-right' size='16' color='#595959'></AtIcon>
          </View>
          <View onClick={this.uploadQrcode} className='list'>
            <View>
              <AtIcon value='upload' size='24' color='#595959'></AtIcon>
              <View>上传二维码</View>
            </View>
            <AtIcon value='chevron-right' size='16' color='#595959'></AtIcon>
          </View>
        </View>
        {
          userInfo && 
          <View onClick={this.loginOut} className='like-button'>
            退出登出
          </View>
        }
      </View>
    )
  }
}

export default PersonalCenter
