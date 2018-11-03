import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator, AtInput } from 'taro-ui'
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
    value: 'updatedAt',
  },{
    label: '创建时间',
    value: 'createdAt',
  }];
  
  keyNames = ['qrcodeType', 'order'];

  constructor() {
    super();
    this.state = {
      order: 'updatedAt',
    }
  }

  componentWillMount() {
    this.props.getAllQrcode();
    this.props.getQrcodeType();
  }

  search = (page) => {
    if(this.state.key || this.state.qrcodeType || this.state.order) {
      this.props.getQrcodeByCondition({
        name: this.state.key,
        type: this.state.qrcodeType,
        order: this.state.order,
        page,
      });
    }else {
      this.props.getAllQrcode(page);
    }
  }

  changeKey = (key) => {
    this.setState({ key });
  }

  changeValue = (value, index) => {
    this.setState({ [this.keyNames[index]]: value });
  }

  onPageChange = (currentPage) => {
    this.search(currentPage-1);
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
    const { qrcodeCount, loading, error } = this.props;
    return (
      <View className='index'>
        <View className='search'>
          <AtInput
            name='value'
            type='text'
            placeholder='请输入关键字'
            maxlength={10}
            confirmType='搜索'
            value={key}
            onChange={this.changeKey}
          >
            <View onClick={this.search}>搜索</View>
          </AtInput>
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
            />
          )
        }
      </View>
    )
  }
}

export default WxGroupView;
