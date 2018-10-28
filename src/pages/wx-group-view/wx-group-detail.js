import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './wx-group-detail.less'

class WxGroupDetail extends Component {

  config = {
    navigationBarTitleText: '群详情'
  }

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      ...this.$router.params 
    })
  }

  copyOwnerId() {
    Taro.setClipboardData({ data: this.state.owner });
  }

  render () {
    const { name, desc, image, owner } = this.state;
    return (
      <View
        onClick={this.props.onClick} 
        className='wx-qrcode-detail'
      >
        <View className='at-article'>{name}</View>
        <View className='at-row wx-qrcode-detail-id at-article__h3 at-row__justify--between'>
          <View className='at-col at-col-6'>群主id：{owner}</View>
          <View onClick={this.copyOwnerId} className='at-col at-col-3 wx-qrcode-detail-copy'>复制id</View>
        </View>
        <View className='at-article__p'>{desc}</View>
        <Image className='wx-qrcode-detail-image' src={image} />
      </View>
    )
  }
}

export default WxGroupDetail
