import PropTypes from './plugin-props'

const typeOptions = [
  {
    label: '文字',
    value: 'text'
  },
  {
    label: '密码',
    value: 'password'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '邮箱',
    value: 'email'
  },
  {
    label: '手机号',
    value: 'tel'
  }
]
const textAlignOptions = [
  {
    label: '左对齐',
    value: 'left'
  },
  {
    label: '居中对齐',
    value: 'center'
  },
  {
    label: '右对齐',
    value: 'right'
  }
]

export default {
  name: 'k-input',
  props:{
    type: PropTypes.select({defaultValue: 'text', label: '类型', options: typeOptions}),
    name: PropTypes.input({ defaultValue: 'name', label: 'name' }),
    formName: PropTypes.input({ defaultValue: 'formName', label: 'formName' }),
    placeholder: PropTypes.input({ defaultValue: '请输入', label: '提示信息' }),
    disabled: PropTypes.boolean({ label: 'disabled' }),
    color: PropTypes.color({ label: '字体颜色', defaultValue: '#000' }),
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: '#ffffff' }),
    fontSize: PropTypes.number({ label: '字号(px)' }),
    textAlign: PropTypes.radio({ defaultValue: 'left', label: '文字对齐', options: textAlignOptions}),
  },
  data: () => ({
    commonStyle: {
      padding: {
        left: { value: 10, unit: 'px' },
      },
      border: {
        radius: [5, 5, 5, 5],
        top: { value: 1, unit: 'px' },
        right: { value: 1, unit: 'px' },
        bottom: { value: 1, unit: 'px' },
        left: { value: 1, unit: 'px' },
        color: { value: '#ced4da' }
      }
    }
  }),
  render(){
    const style = {
      color: this.color,
      textAlign: this.textAlign,
      backgroundColor: this.backgroundColor,
      fontSize: this.fontSize + 'px'
    }
    return(
      <input
        class='k-input'
        style={style}
        type={this.type}
        placeholder={this.placeholder}
        disabled={this.disabled}
        name={this.name}
        form-name={this.formName}
      />
    )
  }
}
