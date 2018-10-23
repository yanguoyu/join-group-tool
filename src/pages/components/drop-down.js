import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtRadio } from 'taro-ui';
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
      iconOpen: false,
      curChoose: 0,
    }
  }

  handleChange(value) {
    this.props.onChange(value, this.state.curChoose);
    this.setState({ iconOpen: false })
  }

  clickIndexOption(index){
    if(this.state.iconOpen && index === this.state.curChoose) {
      this.setState({ iconOpen: false, curChoose: index })
    } else {
      this.setState({ iconOpen: true, curChoose: index })
    }
  }

  render () {
    const { options, placeholders, values } = this.props;
    const { iconOpen, curChoose } = this.state;
    const curOption = options[curChoose];
    const newCurOption = [{label: '不限', value: 'ALL'}, ...curOption];
    return (
      <View className='drop-down'>
        <View className='drop-down-options'>
          {
            options.map((option, index) => {
              const newOption = [{label: '不限', value: 'ALL'}, ...(option||[])];
              const chooseItem = newOption.find(item => item.value === values[index]);
              return (
                <View className='drop-down-icon' key={index} onClick={this.clickIndexOption.bind(this, index)}>
                  {
                    chooseItem ? chooseItem.label : (placeholders[index] || "不限")
                  }
                  <AtIcon
                    value={(iconOpen && index ===curChoose) ? 'chevron-up' : 'chevron-down'} size='20'
                    color={(iconOpen && index ===curChoose) ? '#1890ff' : '#8c8c8c'}
                  >
                  </AtIcon>
                </View>
              )
            })
          }
        </View>
        <View className={iconOpen? 'drow-down-option-comm' : 'drow-down-option-close'}>
          <AtRadio
            options={newCurOption}
            value={values[curChoose]}
            onClick={this.handleChange}
          />
        </View>
      </View>
    )
  }
}

export default DropDown
