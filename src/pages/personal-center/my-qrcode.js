import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui';
import QrcodeList from '../components/qrcode-list';
import { deleteQrcode, getUserQrcodes, getUserOpenId } from '../../actions/personal-center'
import Error from '../components/error';

@connect(({ globalData, personalCenter }) => ({
  loading: globalData.loading,
  error: globalData.error,
  userInfo: personalCenter.userInfo,
  userQrcodes: personalCenter.userQrcodes,
  userOpenId: personalCenter.userOpenId,
}), (dispatch) => ({
  deleteQrcode(_id) {
    dispatch(deleteQrcode(_id))
  },
  getUserQrcodes() {
    dispatch(getUserQrcodes())
  },
  getUserOpenId() {
    dispatch(getUserOpenId())
  }
}))
class MyQrcode extends Component {

  config = {
    navigationBarTitleText: '我上传的',
  }

  constructor() {
    super();
    Taro.showShareMenu({
      withShareTicket: true
    })
    this.state = {
      current: 1,
      pageSize: 4,
    }
  }

  componentWillMount() {
    this.setState({ current: 1});
    this.props.getUserQrcodes();
    this.props.getUserOpenId();
  }

  onPageChange = (current) => {
    this.setState({
      current,
    });
  }

  delete = (_id) => {
    this.props.deleteQrcode(_id);
  }

  onShareAppMessage() {
    return {
      title: '快来加入我的群吧',
      path: `/pages/wx-group-view/index?user=${this.props.userOpenId}`
    }
  }

  render () {
    const { current, pageSize } = this.state;
    const { userQrcodes, loading, error } = this.props;
    const total = userQrcodes.length;
    const curDisplayList = userQrcodes.slice((current-1)*pageSize, current*pageSize);
    return (
      <View className='qrcode-list'>
        {
          loading ?
          <AtActivityIndicator mode='center' content='加载中' /> : 
          error ?
          <Error/> :
          <QrcodeList
            isOwner
            qrcodeList={curDisplayList}
            total={total}
            onPageChange={this.onPageChange}
            pageSize={pageSize}
            onDelete={this.delete}
          />
        }
      </View>
    )
  }
}

export default MyQrcode
