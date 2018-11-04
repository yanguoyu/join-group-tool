// import Taro, { Component } from '@tarojs/taro'
// import { View } from '@tarojs/components'
// import { AtActivityIndicator, AtSearchBar } from 'taro-ui'
// import { connect } from '@tarojs/redux'
// import QrcodeList from '../components/qrcode-list';
// import DropDown from '../components/drop-down';
// import Error from '../components/error';
// import { getAllQrcode } from '../../actions/wx-group-view';
// import { getQrcodeType } from '../../actions/personal-center';

// import './index.less'

// class Help extends Component {

//   config = {
//     navigationBarTitleText: '使用帮助'
//   }

//   render () {
//     const { key } = this.state;
//     const options = [
//       this.props.qrcodeTypes,
//       this.order,
//     ];
//     const values = [
//       this.state[this.keyNames[0]],
//       this.state[this.keyNames[1]],
//     ];
//     const { qrcodeCount, loading, error, pageNo, pageSize } = this.props;
//     return (
//       <View className='index'>
//         <View className='search'>
//           <AtSearchBar
//             className='qrcode-view-search-bar'
//             value={key}
//             onChange={this.changeKey}
//             onConfirm={this.search}
//           />
//           <DropDown
//             options={options}
//             values={values}
//             onChange={this.changeValue}
//           />
//         </View>
//         {
//           loading ? 
//           <AtActivityIndicator mode='center' content='加载中' /> : 
//           (
//             error ?
//             <Error/> :
//             <QrcodeList
//               qrcodeList={this.state.qrcodeList}
//               total={qrcodeCount}
//               onPageChange={this.onPageChange}
//               pageSize={pageSize}
//               current={pageNo}
//             />
//           )
//         }
//       </View>
//     )
//   }
// }

// export default WxGroupView;
