import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { connect } from '@tarojs/redux';
import { getHelpInfo } from '../../actions/help';
import Error from '../components/error';

import './index.less'

@connect(({ globalData, help }) => ({
  loading: globalData.loading,
  error: globalData.error,
  helpInfo: help.helpInfo
}), (dispatch) => ({
  getHelpInfo() {
    dispatch(getHelpInfo())
  }
}))
class Help extends Component {

  config = {
    navigationBarTitleText: '使用帮助'
  }

  componentWillMount() {
    this.props.getHelpInfo();
  }

  render () {
    const { helpInfo, loading, error } = this.props;
    return (
      <View className='help-index'>
        <View className='at-article help-index-main'>帮助手册</View>
        {
          loading ? 
          <AtActivityIndicator mode='center' content='加载中' /> : 
          (
            error ?
            <Error /> :
            helpInfo.map(help => (
              <View key={help._id}>
                <View className='at-article__h1'>{help.desc}</View>
                <View className='at-article__p'>{help.title}</View>
                <Image  className='at-article__img help-index-image' src={help.image} />
              </View>
            ))
          )
        }
      </View>
    )
  }
}

export default Help;
