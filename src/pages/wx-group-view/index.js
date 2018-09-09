import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtInput } from 'taro-ui'
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

  search = () => {
    const qrcodeQuery = new AV.Query('qrcode_info');
    if(this.state.key) {
      qrcodeQuery.contains('name', this.state.key);
    }
    qrcodeQuery
      .find()
      .then(result => {
        this.setState({
          qrcodeList: result.map(res => ({
          name: res.get('name'),
          desc: res.get('desc'),
          image: res.get('image'),
        }))})
      });
  }

  changeKey = (value) => {
    this.setState({ key: value });
  }

  render () {
    return (
      <View className='index'>
        <View className='search'>
          <AtInput
            name='value'
            type='text'
            placeholder='请输入关键字'
            maxlength={10}
            confirmType='搜索'
            value={this.state.key}
            onChange={this.changeKey}
          >
            <View onClick={this.search}>搜索</View>
          </AtInput>
        </View>
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
