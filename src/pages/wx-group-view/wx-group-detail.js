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
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  componentWillMount() {
    this.setState({
      ...this.$router.params 
    })
  }

  copyOwnerId() {
    Taro.setClipboardData({ data: this.state.owner });
  }

  onShareAppMessage() {
    const { name, desc, image, owner } = this.state;
    return {
      title: '快来加入我的群吧',
      path: `/pages/wx-group-view/index?pageTo=detail&name=${name}&desc=${desc}&image=${image}&owner=${owner}`
    }
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
          <View className='at-col at-col-8 wx-qrcode-detail-over-flow'>群管理微信：{owner}</View>
          <View onClick={this.copyOwnerId} className='at-col at-col-4 wx-qrcode-detail-copy'>复制微信号</View>
        </View>
        <View className='at-article__p'>{desc}</View>
        <Image className='wx-qrcode-detail-image' src={image} />
      </View>
    )
  }
}

export default WxGroupDetail
