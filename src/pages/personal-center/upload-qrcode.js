import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image, Picker } from '@tarojs/components'
import { AtInput, AtForm, AtNoticebar, AtToast, AtList, AtListItem } from 'taro-ui'
import AV from '../../shared/av-weapp-min'
import { uploadQrcode, getQrcodeType, changeFormValue } from '../../actions/personal-center'
import './upload-qrcode.less'

const isError = (value) => (value === '' || value === null || value === undefined)

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo,
  tempUrl: personalCenter.tempUrl,
  qrcodeTypes: personalCenter.qrcodeTypes,
  qrcodeType: personalCenter.formValues.qrcodeType
}), (dispatch) => ({
  uploadQrcode(url) {
    dispatch(uploadQrcode(url))
  },
  getQrcodeType() {
    dispatch(getQrcodeType())
  },
  changeFormValue(key, value) {
    dispatch(changeFormValue({ [key]: value }))
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
      groupOwner: { error: false }
    };
  }

  reset() {
    this.props.uploadQrcode(null);
    this.setState({
      groupName: { value: '', error: false },
      groupDescribe: { value: '', error: false },
      groupOwner: { value: '', error: false }
    })
  }

  componentWillMount () { 
    this.props.getQrcodeType();
  }

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
  changeOwner = (value) => this.setState({ groupOwner: { value , error: isError(value) } });

  checkValue(key) {
    if(isError(this.state[key].value)) {
      this.setState({ [key]: { value: this.state[key].value, error: true } });
      return false;
    }
    return true;
  }

  checkForm() {
    const groupName = this.checkValue('groupName');
    const groupDescribe = this.checkValue('groupDescribe');
    const groupOwner = this.checkValue('groupOwner');
    return groupName && groupDescribe && groupOwner;
  }

  onSave = () => {
    if(this.checkForm()){
      if(this.props.tempUrl) {
        const GroupInfo = AV.Object.extend('qrcode_info');
        const groupType = AV.Object.createWithoutData('qrcode_type', this.props.qrcodeType.id);
        const groundInfo = new GroupInfo();
        groundInfo.set('name', this.state.groupName.value);
        groundInfo.set('desc', this.state.groupDescribe.value);
        groundInfo.set('owner', this.state.groupOwner.value);
        groundInfo.set('image', this.props.tempUrl);
        groundInfo.set('type', groupType);
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

  changeQrType = ({ detail }) => {
    this.props.changeFormValue('qrcodeType', this.props.qrcodeTypes[detail.value]);
  }
  
  render () {
    const { userInfo, tempUrl, qrcodeTypes, qrcodeType } = this.props;
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
            border={false}
            value={this.state.groupName.value}
            error={this.state.groupName.error}
            onChange={this.changeName}
            maxlength={20}
          />
          <AtList class='qrcode-type'>
            <Picker
              mode='selector'
              rangeKey='name'
              range={qrcodeTypes}
              onChange={this.changeQrType}
            >
              <AtListItem title='群类型' extraText={qrcodeType.name} />
            </Picker>
          </AtList>
          <AtInput
            name='groupOwner'
            title='群主号'
            type='text'
            placeholder='请输入群主微信号'
            value={this.state.groupOwner.value}
            error={this.state.groupOwner.error}
            onChange={this.changeOwner}
            maxlength={20}
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
