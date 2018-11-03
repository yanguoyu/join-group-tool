import Taro, { Component } from '@tarojs/taro'
import { AtActivityIndicator } from 'taro-ui'


class ErrorLoading extends Component {

    render() {
        const { loading, error, ActuralComponent } = this.props;
        if(loading) {
            return <AtActivityIndicator mode='center' content='加载中' />;
        } else if(error) {
            return 'error'
        }
        return ActuralComponent;
    }
}
export default ErrorLoading