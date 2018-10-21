import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './qrcode-view.less';

// 由于小程序的限制 Flex 组件只能通过样式来完成
if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

class QrcodeView extends Component {

  static defaultProps = {
    qrcodeInfo: {}
  }

  render () {
    const { name, desc, image, owner } = this.props.qrcodeInfo;
    return (
      <View className='qrcode-view at-row at-row__justify--center at-row--wrap'>
        <Image src={image} className='at-col at-col-12' />
        <View className='at-col at-col-12 qrcode-desc' >群描述：{desc}</View>
        <View className='at-col at-col-12 qrcode-desc' >群主id：{owner}</View>
        <View className='at-col at-col-12 qrcode-name' >{name}</View>
      </View>
    )
  }
}

export default QrcodeView
