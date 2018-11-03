import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Picker } from '@tarojs/components'
import { AtInput, AtForm, AtNoticebar, AtList, AtListItem } from 'taro-ui'
import { upLoadQrcode, getQrcodeType } from '../../actions/personal-center'
import './upload-qrcode.less'

const isError = (value) => (value === '' || value === null || value === undefined)

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo,
  tempUrl: personalCenter.tempUrl,
  qrcodeTypes: personalCenter.qrcodeTypes,
}), (dispatch) => ({
  upLoadQrcode(qrcodeInfo) {
    dispatch(upLoadQrcode(qrcodeInfo))
  },
  getQrcodeType() {
    dispatch(getQrcodeType())
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
      groupOwner: { error: false },
      qrcodeTypeIndex: 0,
    };
  }

  reset() {
    this.setState({
      groupName: { value: '', error: false },
      groupDescribe: { value: '', error: false },
      groupOwner: { value: '', error: false },
      tempUrl: null,
    })
  }

  componentWillMount () { 
    this.props.getQrcodeType();
    if(this.$router.params._id) {
      wx.cloud.callFunction({
        name: 'get-qrcode-byid',
        data: {
          _id: this.$router.params._id
        },
      }).then(res => {
        const qrcodeInfo = res.result;
        let typeInfo = qrcodeInfo.type;
        this.setState({
          groupName: { value: qrcodeInfo.name, error: false },
          groupDescribe: { value: qrcodeInfo.desc, error: false },
          groupOwner: { value: qrcodeInfo.owner, error: false },
          tempUrl: qrcodeInfo.image
        });
        const qrcodeTypeIndex = this.props.qrcodeTypes.findIndex(item => item._id === typeInfo);
        this.setState({ qrcodeTypeIndex });
      })
    }
  }

  uploadQrcodeImage = () => {
    Taro.chooseImage({
      count: 1,
      sourceType: ['album']
    }).then( qrCodeSource => {
      wx.cloud.uploadFile({
        cloudPath: `qrcodes-images/${new Date().getTime()}}.png`,
        filePath: qrCodeSource.tempFilePaths[0],
      }).then(res => {
        this.setState({
          tempUrl: res.fileID
        })
        console.log(res.fileID)
      })
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
      if(this.state.tempUrl) {
        this.props.upLoadQrcode({
          _id: this.$router.params._id,
          name: this.state.groupName.value,
          desc: this.state.groupDescribe.value,
          owner: this.state.groupOwner.value,
          image: this.state.tempUrl,
          typeId: this.props.qrcodeTypes[this.state.qrcodeTypeIndex]._id,
        });
      } else {
        Taro.showToast({
          title: '请上传群二维码',
          image: '/assert/_warning.png',
          duration: 2000
        })
      }
    }
  }

  changeQrType = ({ detail }) => {
    this.setState({
      qrcodeTypeIndex: detail.value
    })
  }

  viewImage = () => {
    Taro.previewImage({ urls: [this.state.tempUrl]});
  }
  
  render () {
    const { userInfo, qrcodeTypes } = this.props;
    const { tempUrl, qrcodeTypeIndex } = this.state;
    const qrcodeType = qrcodeTypes[qrcodeTypeIndex];
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
              value={qrcodeTypeIndex}
            >
              <AtListItem title='群类型' extraText={qrcodeType.name} />
            </Picker>
          </AtList>
          <AtInput
            name='groupOwner'
            title='群管理'
            type='text'
            placeholder='请输入群管理微信号'
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
          <View className='upload' onClick={this.uploadQrcodeImage}>
            { tempUrl ? '重新上传二维码' : '上传二维码' }
          </View>
          <View className='at-article__p'>
            若群限制加入，请上传群主或者群管理微信二维码
          </View>
          {
            tempUrl &&
            <View className='upload upload-qrcode-image-view' onClick={this.viewImage}>
              预览二维码
            </View>
          }
        </View>
        <View className='save-or-cancel' onClick={this.onSave}>
          保存
        </View>
      </View>
    )
  }
}

export default UploadQrcode;
