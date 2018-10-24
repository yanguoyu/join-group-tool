import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import QrcodeList from '../components/qrcode-list';
import AV from '../../shared/av-weapp-min'

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo
}))
class MyQrcode extends Component {

  config = {
    navigationBarTitleText: '我上传的',
  }

  constructor() {
    super();
    this.state = {
      qrcodeList: [],
      current: 1,
      pageSize: 4,
    }
  }

  componentWillMount() {
    const curUser = AV.Object.createWithoutData('_User', this.props.userInfo.objectId);
    const qrcodeQuery = new AV.Query('qrcode_info');
    qrcodeQuery.equalTo('user', curUser);
    qrcodeQuery
      .find()
      .then(result => {
        this.setState({
          current: 1,
          qrcodeList: result.map(value => ({
          name: value.get('name'),
          desc: value.get('desc'),
          image: value.get('image'),
          owner: value.get('owner')
        }))})
      });
  }

  onPageChange = (current) => {
    this.setState({
      current,
    });
  }

  render () {
    const { qrcodeList, current, pageSize } = this.state;
    const total = qrcodeList.length;
    const curDisplayList = qrcodeList.slice((current-1)*pageSize, current*pageSize);
    return (
      <View className='qrcode-list'>
        <QrcodeList
          qrcodeList={curDisplayList}
          total={total}
          onPageChange={this.onPageChange}
          pageSize={pageSize}
        />
      </View>
    )
  }
}

export default MyQrcode
