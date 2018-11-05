import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui';
import MyPicker from './my-picker';
import './drop-down.less';

class DropDown extends Component {

  static defaultProps = {
    options: [],
    placeholders: [],
    values: [],
  }

  constructor() {
    super();
    this.state = {
      curChoose: undefined,
    }
  }

  handleChange(chooseIndex, value) {
    this.props.onChange(value, chooseIndex);
    this.setState({ curChoose: undefined })
  }

  openPicker(index) {
    this.setState({ curChoose: index })
  }

  onCancel() {
    this.setState({ curChoose: undefined })
  }

  render () {
    const { options, placeholders, values } = this.props;
    const { curChoose } = this.state;
    return (
      <View className='drop-down'>
        <View className='drop-down-options'>
          {
            options.map((option, index) => {
              const newCurOption = [{label: '不限', value: 'ALL'}, ...(option || [])];
              const hasChoose = index === curChoose;
              return (
                <MyPicker
                  mode='selector'
                  rangeKey='label'
                  keyName='value'
                  range={newCurOption}
                  onChange={this.handleChange.bind(this, index)}
                  value={values[index]}
                  key={index}
                  onCancel={this.onCancel}
                >
                  <View className='drop-down-icon' key={index} onClick={this.openPicker.bind(this, index)} >
                    {
                      values[index] ? values[index].label : (placeholders[index] || "不限")
                    }
                    {
                      hasChoose ?
                      <AtIcon value='chevron-up' size='20' color='#1890ff' />:
                      <AtIcon value='chevron-down' size='20' color='#8c8c8c' />
                    }
                  </View>
                 </MyPicker>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default DropDown
