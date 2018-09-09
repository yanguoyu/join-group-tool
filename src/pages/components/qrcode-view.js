import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtCard } from 'taro-ui';

class QrcodeView extends Component {

  static defaultProps = {
    qrcodeInfo: {}
  }

  render () {
    const { name, desc, image } = this.props.qrcodeInfo;
    return (
    <AtCard
      title={name}
      isFull
    >
      <Image src={image} />
      <View>
        {
          desc
        }
      </View>
    </AtCard>
    )
  }
}

export default QrcodeView
