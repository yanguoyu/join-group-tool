import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import QrcodeList from '../components/qrcode-list';
import { deleteQrcode, getUserQrcodes } from '../../actions/personal-center'

@connect(({ personalCenter }) => ({
  userInfo: personalCenter.userInfo,
  userQrcodes: personalCenter.userQrcodes
}), (dispatch) => ({
  deleteQrcode(_id) {
    dispatch(deleteQrcode(_id))
  },
  getUserQrcodes() {
    dispatch(getUserQrcodes())
  }
}))
class MyQrcode extends Component {

  config = {
    navigationBarTitleText: '我上传的',
  }

  constructor() {
    super();
    this.state = {
      current: 1,
      pageSize: 4,
    }
  }

  componentWillMount() {
    this.setState({ current: 1});
    this.props.getUserQrcodes();
  }

  onPageChange = (current) => {
    this.setState({
      current,
    });
  }

  delete = (_id) => {
    this.props.deleteQrcode(_id);
  }

  render () {
    const { current, pageSize } = this.state;
    const { userQrcodes } = this.props;
    const total = userQrcodes.length;
    const curDisplayList = userQrcodes.slice((current-1)*pageSize, current*pageSize);
    return (
      <View className='qrcode-list'>
        <QrcodeList
          isOwner
          qrcodeList={curDisplayList}
          total={total}
          onPageChange={this.onPageChange}
          pageSize={pageSize}
          onDelete={this.delete}
        />
      </View>
    )
  }
}

export default MyQrcode
