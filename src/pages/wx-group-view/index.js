import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { connect } from '@tarojs/redux'
import AV from '../../shared/av-weapp-min'
import QrcodeList from '../components/qrcode-list';

import './index.less'


@connect(({ counter }) => ({
  counter
}))
class WxGroupView extends Component {

  config = {
    navigationBarTitleText: '加群助手'
  }

  componentWillMount() {
    const qrcodeQuery = new AV.Query('qrcode_info');
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
      <View className='index'>
        {
          this.state.qrcodeList ?
          <QrcodeList  qrcodeList={this.state.qrcodeList} /> : 
          <AtActivityIndicator mode='center' content='加载中...' />
        }
      </View>
    )
  }
}

export default WxGroupView
