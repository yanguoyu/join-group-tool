import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtSearchBar, AtNoticebar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import QrcodeList from '../components/qrcode-list';
import DropDown from '../components/drop-down';
import Error from '../components/error';
import { getAllQrcode } from '../../actions/wx-group-view';
import { getQrcodeType } from '../../actions/personal-center';

import './index.less'

@connect(({ globalData, wxGroupView, personalCenter }) => ({
  loading: globalData.loading,
  error: globalData.error,
  qrcodeList: wxGroupView.qrcodeInfo.pageInfo,
  pageNo: wxGroupView.qrcodeInfo.pageNo,
  pageSize: wxGroupView.qrcodeInfo.pageSize,
  qrcodeCount: wxGroupView.qrcodeInfo.count,
  qrcodeTypes: personalCenter.qrcodeTypes.map(item => ({
    label: item.name,
    value: item._id
  })),
}), (dispatch) => ({
  getAllQrcode(queryParams) {
    dispatch(getAllQrcode(queryParams))
  },
  getQrcodeType() {
    dispatch(getQrcodeType())
  }
}))
class WxGroupView extends Component {

  config = {
    navigationBarTitleText: '加群助手'
  }

  order = [{
    label: '更新时间',
    value: 'updateAt',
  },{
    label: '创建时间',
    value: 'createAt',
  }];

  pages =  {
    uploadQrcode:'/pages/personal-center/upload-qrcode',
    detail:'/pages/wx-group-view/wx-group-detail',
  };
  
  keyNames = ['type', 'order'];

  constructor() {
    super();
    Taro.showShareMenu({
      withShareTicket: true
    });
    this.state = {
      order: 'createAt',
    }
  }

  combindParams(params) {
    return Object.keys(params).reduce((pre, cur) => {
      if(cur) {
        return pre + `${cur}=${params[cur]}&`
      }
      return pre;
    }, '?');
  }

  componentWillMount() {
    if(this.$router.params.pageTo) {
      const params = { ...this.$router.params };
      delete params.pageTo;
      console.log(this.$router.params.pageTo)
      Taro.navigateTo({
        url: this.pages[this.$router.params.pageTo] + this.combindParams(params)
      })
      return;
    }
    this.props.getAllQrcode({
      order: this.state.order,
      user: this.$router.params.user
    });
    this.setState({
      user: this.$router.params.user
    })
    this.props.getQrcodeType();
  }

  changeKey = (key) => {
    this.setState({ key });
  }

  search = () => {
    this.props.getAllQrcode({
      name: this.state.key,
      type: this.state.type,
      order: this.state.order,
      user: undefined,
    });
  }

  changeValue = (value, index) => {
    this.setState({ [this.keyNames[index]]: value });
    this.props.getAllQrcode({
      name: this.state.key,
      type: this.state.type,
      order: this.state.order,
      [this.keyNames[index]]: value,
      user: undefined,
    });
  }

  onPageChange = (currentPage) => {
    this.props.getAllQrcode({
      name: this.state.key,
      type: this.state.type,
      order: this.state.order,
      user: this.state.user,
      page: currentPage-1
    });
  }

  render () {
    const { key } = this.state;
    const options = [
      this.props.qrcodeTypes,
      this.order,
    ];
    const values = [
      this.state[this.keyNames[0]],
      this.state[this.keyNames[1]],
    ];
    const { qrcodeCount, loading, error, pageNo, pageSize } = this.props;
    return (
      <View className='index'>
        {
          this.state.user &&
          <AtNoticebar>这是分享者的群，如果需要全部群，请重新搜索</AtNoticebar>
        }
        <View className='search'>
          <AtSearchBar
            className='qrcode-view-search-bar'
            value={key}
            onChange={this.changeKey}
            onConfirm={this.search}
          />
          <DropDown
            options={options}
            values={values}
            onChange={this.changeValue}
          />
        </View>
        {
          loading ? 
          <AtActivityIndicator mode='center' content='加载中' /> : 
          (
            error ?
            <Error/> :
            <QrcodeList
              qrcodeList={this.state.qrcodeList}
              total={qrcodeCount}
              onPageChange={this.onPageChange}
              pageSize={pageSize}
              current={pageNo}
            />
          )
        }
      </View>
    )
  }
}

export default WxGroupView;
