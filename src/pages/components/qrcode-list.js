import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtPagination } from 'taro-ui';
import QrcodeView from './qrcode-view';

import './qrcode-list.less'

// 由于小程序的限制 Flex 组件只能通过样式来完成
if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

class QrcodeList extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      current: 1,
    }
  }

  static defaultProps = {
    qrcodeList: [],
    pageSize: 10
  }

  changePage = ({ current }) => {
    this.setState({ current });
    this.props.onPageChange(current);
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }

  gotoDetail(qrcodeInfo) {
    if(!this.props.isOwner) {
      const { name, desc, image, owner } = qrcodeInfo;
      Taro.navigateTo({
        url: `/pages/wx-group-view/wx-group-detail?name=${name}&desc=${desc}&image=${image}&owner=${owner}`,
      })
    }
  }

  onClickImage = (image) => {
    if(!this.props.isOwner) {
      Taro.previewImage({ urls: [image]}).catch(err => {console.log(err)})
    }
  }

  render () {
    const { qrcodeList, pageSize, total, isOwner } = this.props;
    if(!total) {
      return (
        <View className='at-article__p no-data'>
          <View>
            <Image src='/assert/no_data.png' />
            <View>暂无数据</View>
          </View>
        </View>
      )
    }
    const { current } = this.state;
    return (
      <View className='qrcode-list'>
        <View className='at-row at-row__justify--left at-row--wrap'>
          {
            qrcodeList.map((qrcodeInfo, index) => {
              return (
              <View
                onClick={this.gotoDetail.bind(this, qrcodeInfo)}
                key={index}
                className='at-col at-col-5 qrcode-list-item'
              >
                <QrcodeView
                  isOwner={isOwner}
                  onClickImage={this.onClickImage}
                  qrcodeInfo={qrcodeInfo}
                  onDelete={this.props.onDelete}
                />
              </View>
              )
            })
          }
        </View>
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

export default (QrcodeList);
