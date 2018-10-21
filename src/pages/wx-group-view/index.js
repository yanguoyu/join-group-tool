import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import QrcodeList from '../components/qrcode-list';
import { getAllQrcode, getQrcodeByCondition } from '../../actions/wx-group-view';

import './index.less'


@connect(({ wxGroupView }) => ({
  qrcodeList: wxGroupView.qrcodeList
}), (dispatch) => ({
  getAllQrcode() {
    dispatch(getAllQrcode())
  },
  getQrcodeByCondition(conditions) {
    dispatch(getQrcodeByCondition(conditions))
  }
}))
class WxGroupView extends Component {

  config = {
    navigationBarTitleText: '加群助手'
  }

  componentWillMount() {
    this.props.getAllQrcode();
  }

  search = () => {
    if(this.state.key) {
      this.props.getQrcodeByCondition({ name: this.state.key});
    }else {
      this.props.getAllQrcode();
    }
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
