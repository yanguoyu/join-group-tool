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
  userOpenId: personalCenter.userOpenId,
  ...personalCenter.userQrcodes,
}), (dispatch) => ({
  deleteQrcode(_id, success) {
    dispatch(deleteQrcode(_id, success))
  },
  getUserQrcodes(queryParams) {
    dispatch(getUserQrcodes(queryParams))
  },
  getUserOpenId() {
    dispatch(getUserOpenId())
  }
}))
class MyQrcode extends Component {

  config = {
    navigationBarTitleText: '我上传的',
  }

  static defaultProps = {
    pageSize: 4,
    pageNo: 0,
  }

  constructor() {
    super();
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  componentWillMount() {
    this.props.getUserQrcodes({
      pageSize: this.props.pageSize,
      pageNo: this.props.pageNo,
    });
    this.props.getUserOpenId();
  }

  onPageChange = (current) => {
    this.props.getUserQrcodes({
      pageSize: this.props.pageSize,
      pageNo: current - 1,
    });
  }

  delete = (_id) => {
    this.props.deleteQrcode(_id, () => {
      this.props.getUserQrcodes({
        pageSize: this.props.pageSize,
        pageNo: this.props.pageNo,
      });
    });
  }

  onShareAppMessage() {
    return {
      title: '快来加入我的群吧',
      path: `/pages/wx-group-view/index?user=${this.props.userOpenId}`
    }
  }

  render () {
    const { count, pageSize, pageNo, pageInfo, loading, error } = this.props;
    return (
      <View className='qrcode-list'>
        {
          loading ?
          <AtActivityIndicator mode='center' content='加载中' /> : 
          error ?
          <Error /> :
          <QrcodeList
            isOwner
            qrcodeList={pageInfo}
            total={count}
            onPageChange={this.onPageChange}
            pageSize={pageSize}
            onDelete={this.delete}
            current={pageNo+1}
          />
        }
      </View>
    )
  }
}

export default MyQrcode
