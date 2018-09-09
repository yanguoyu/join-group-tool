import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import QrcodeList from '../components/qrcode-list';
import AV from '../../shared/av-weapp-min'

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo
}))
class MyQrcode extends Component {

  componentWillMount() {
    const curUser = AV.Object.createWithoutData('_User', this.props.userInfo.objectId);
    const qrcodeQuery = new AV.Query('qrcode_info');
    qrcodeQuery.equalTo('user', curUser);
    qrcodeQuery
      .find()
      .then(result => {
        this.setState({
          qrcodeList: result.map(value => ({
          name: value.get('name'),
          desc: value.get('desc'),
          image: value.get('image'),
        }))})
      });
  }



  render () {
    return (
      <View className='qrcode-list'>
        <QrcodeList qrcodeList={this.state.qrcodeList} />
      </View>
    )
  }
}

export default MyQrcode
