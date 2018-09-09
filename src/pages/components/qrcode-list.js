import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtPagination } from 'taro-ui';
import QrcodeView from './qrcode-view';

import './qrcode-list.less'

class QrcodeList extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      current: 1,
    }
  }

  static defaultProps = {
    qrcodeList: [],
    pageSize: 3
  }

  changePage = ({ current }) => {
    this.setState({ current });
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }

  render () {
    const { qrcodeList, pageSize } = this.props;
    const total = qrcodeList && qrcodeList.length;
    if(!total) {
      return <View>暂无数据</View>;
    }
    const { current } = this.state;
    const curDisplayList = qrcodeList.slice((current-1)*pageSize, current*pageSize);
    return (
      <View className='qrcode-list'>
        {
          curDisplayList.map((qrcodeInfo, index) => {
            return (
            <View key={index}>
              <QrcodeView qrcodeInfo={qrcodeInfo} />
            </View>
            )
          })
        }
        {
          total && total > pageSize && 
          <View className='pagination'>
            <AtPagination
              total={total}
              pageSize={pageSize}
              current={current}
              onPageChange={this.changePage}
            />
          </View>
        }
      </View>
    )
  }
}

export default QrcodeList
