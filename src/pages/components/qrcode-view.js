import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtModal } from 'taro-ui'
import './qrcode-view.less';

// 由于小程序的限制 Flex 组件只能通过样式来完成
if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

class QrcodeView extends Component {

  static defaultProps = {
    qrcodeInfo: {},
    isOwner: false,
  }

  clickImage = (e) => {
    e.stopPropagation();
    this.props.onClickImage(this.props.qrcodeInfo.image);
  }

  edit = () => {
    Taro.navigateTo({
      url: `/pages/personal-center/upload-qrcode?_id=${this.props.qrcodeInfo._id}`
    })
  }

  delete = () => {
    this.setState({ isOpenedModal: true});
  }

  onCancel = () => {
    this.setState({ isOpenedModal: false});
  }

  handleConfirm = () => {
    this.setState({ isOpenedModal: false});
    this.props.onDelete(this.props.qrcodeInfo._id);
  }

  render () {
    const { isOwner, qrcodeInfo } = this.props;
    const { isOpenedModal } = this.state;
    const { name, desc, image, owner } = qrcodeInfo;
    return (
      <View className='qrcode-view at-row at-row__justify--center at-row--wrap'>
        <Image onClick={this.clickImage} src={image} className='at-col at-col-12' />
        <View className='at-col at-col-12 qrcode-desc qrcode-view-over-flow'>群描述：{desc}</View>
        <View className='at-col at-col-12 qrcode-desc qrcode-view-over-flow'>群管理微信：{owner}</View>
        {
          isOwner && 
          <View className='at-row at-col-12 qrcode-view-edit-main'>
            <View onClick={this.edit} className='at-col at-col-6 qrcode-view-edit'>
              <AtIcon value='edit' size='20' color='#91d5ff'></AtIcon>
            </View>
            <View onClick={this.delete} className='at-col at-col-6 qrcode-view-edit'>
              <AtIcon value='trash' size='20' color='#ffa39e'></AtIcon>
            </View>
          </View>
        }
        <View className='at-col at-col-12 qrcode-name qrcode-view-over-flow'>{name}</View>
        <AtModal
          isOpened={isOpenedModal}
          cancelText='取消'
          confirmText='确认'
          onCancel={this.onCancel}
          onConfirm={this.handleConfirm}
          content='确认删除该二维码吗？'
        />
      </View>
    )
  }
}

export default QrcodeView
