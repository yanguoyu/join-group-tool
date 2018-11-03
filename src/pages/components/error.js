import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui';
import './error.less';

if (process.env.TARO_ENV === 'weapp') {
    require('taro-ui/dist/weapp/css/index.css')
} else if (process.env.TARO_ENV === 'h5') {
    require('taro-ui/dist/h5/css/index.css')
}

class Error extends Component {

    refresh() {
        Taro.reLaunch({
            url: '/pages/wx-group-view/index'
        })
    }

    render () {
        return (
            <View className='at-article__info error'>
                <Image src='/assert/error.png' />
                <View className='at-article__info'>发生了一些错误，请尝试刷新</View>
                <AtButton type='primary' size='small' onClick={this.refresh}>点击刷新</AtButton>
            </View>
        )
    }
}

export default Error
