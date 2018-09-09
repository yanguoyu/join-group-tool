import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import { AtInput, AtForm, AtNoticebar, AtToast } from 'taro-ui'
import AV from '../../shared/av-weapp-min'
import { uploadQrcode } from '../../actions/personal-center'
import './upload-qrcode.less'

const isError = (value) => (value === '' || value === null || value === undefined)

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo,
  tempUrl: personalCenter.tempUrl
}), (dispatch) => ({
  uploadQrcode(url) {
    dispatch(uploadQrcode(url))
  }
}))
class UploadQrcode extends Component {

  config = {
    navigationBarTitleText: '上传二维码',
  }

  constructor() {
    super(...arguments);
    this.state = {
      groupName: { error: false },
      groupDescribe: { error: false },
    };
  }

  reset() {
    this.props.uploadQrcode(null);
    this.setState({
      groupName: { value: '', error: false },
      groupDescribe: { value: '', error: false },
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  uploadQrcode = () => {
    Taro.chooseImage({
      count: 1,
      sourceType: ['album']
    }).then( qrCodeSource => {
      var tempFilePath = qrCodeSource.tempFilePaths[0];
      new AV.File('qr-code', {
        blob: {
          uri: tempFilePath,
        },
      }).save().then(
        file => {
          this.props.uploadQrcode(file.url())                                                                                                                                                                                                                                   
        }
      );
    })
  }

  changeName = (value) => this.setState({ groupName: { value , error: isError(value) } });
  changeDescribe = (value) => this.setState({ groupDescribe: { value , error: isError(value) } });

  checkForm() {
    const isNameError = isError(this.state.groupName.value);
    const isDescError = isError(this.state.groupDescribe.value);
    if(isNameError) {
      this.setState({ groupName: { value: this.state.groupName.value, error: true } });
    }
    if(isDescError){
      this.setState({ groupDescribe: { value: this.state.groupDescribe.value, error: true } });
    }
    return !(isNameError || isDescError);
  }

  onSave = () => {
    if(this.checkForm()){
      if(this.props.tempUrl) {
        const GroupInfo = AV.Object.extend('qrcode_info');
        const groundInfo = new GroupInfo();
        groundInfo.set('name', this.state.groupName.value);
        groundInfo.set('desc', this.state.groupDescribe.value);
        groundInfo.set('image', this.props.tempUrl);
        if(this.props.userInfo) {
          const userPointer = AV.Object.createWithoutData('_User', this.props.userInfo.objectId);
          groundInfo.set('user', userPointer);
        }
        groundInfo
          .save()
          .then(
            () => {
              this.reset();
              Taro.navigateBack();
              Taro.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
            }
          )
      } else {
        this.setState({ isOpened: true });
      }
    }
  }
  
  render () {
    const { userInfo, tempUrl } = this.props;
    return (
      <View className='upload-qrcode'>
        {
          !userInfo &&
          <View className='notice'>
            <AtNoticebar icon='bell' single>
              提示：未登陆不会把上传的二维码记录到我上传的二维码。
            </AtNoticebar>
          </View>
        }
        <AtForm>
          <AtInput
            name='groupName'
            title='群名称'
            type='text'
            placeholder='请输入微信群名称'
            value={this.state.groupName.value}
            error={this.state.groupName.error}
            onChange={this.changeName}
            maxlength={10}
            clear
          />
          <AtInput
            name='groupDescribe'
            title='群描述'
            type='text'
            placeholder='请输入微信群简介'
            border={false}
            value={this.state.groupDescribe.value}
            error={this.state.groupDescribe.error}
            onChange={this.changeDescribe}
            clear
          />
        </AtForm>
        <View className='choose-qrcode'>
          <View className='upload' onClick={this.uploadQrcode}>
            { tempUrl ? '重新上传二维码' : '上传二维码' }
          </View>
          {
            tempUrl &&
            <Image src={tempUrl} />
          }
        </View>
        <View className='save-or-cancel' onClick={this.onSave}>
          保存
        </View>
        <AtToast
          isOpened={this.state.isOpened}
          duration={2000}
          text='请上传群二维码'
        />
      </View>
    )
  }
}

export default UploadQrcode;
