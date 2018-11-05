import Taro, { Component } from '@tarojs/taro'
import { Picker } from '@tarojs/components'

class MyPicker extends Component {

  static defaultProps = {
    range: [],
    keyName: 'id',
    value: {},
  }


  handleChange = ({ detail }) => {
    const index = detail.value;
    this.props.onChange(this.props.range[index]);
  }

  render () {
    const { range, value, keyName, mode, rangeKey, onCancel } = this.props;
    const chooseIndex = range.findIndex(item => item[keyName] === value[keyName]);
    return (
      <Picker
        mode={mode}
        rangeKey={rangeKey}
        range={range}
        onChange={this.handleChange}
        value={chooseIndex === -1 ? 0 : chooseIndex}
        onCancel={onCancel}
      >
        {this.props.children}
      </Picker>
    )
  }
}

export default MyPicker
