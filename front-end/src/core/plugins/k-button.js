import PropTypes from './plugin-props'
import {postAxios} from '@/utils'

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
  name: 'k-button',
  props: {
    interface: PropTypes.input({ defaultValue: '/form/submit', label: '提交接口' }),
    formName: PropTypes.input({ defaultValue: 'formName', label: 'formName' }),
    text: PropTypes.input({defaultValue: '按钮', label: '按钮文字'}),
    disabled: PropTypes.boolean({ label: 'disabled' }),
    color: PropTypes.color({ label: '字体颜色', defaultValue: '#000' }),
    background: PropTypes.color({ label: '背景色', defaultValue: '#ffffff' }),
    backgroundImg: PropTypes.upload({label: '背景图'}),
    fontSize: PropTypes.number({ label: '字号(px)' }),
    textAlign: PropTypes.radio({ defaultValue: 'center', label: '文字对齐', options: textAlignOptions}),
    submitText: PropTypes.input({ defaultValue: '提交成功', label: '提交文字' }),
  },
  data: () => ({
    commonStyle: {
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
  methods: {
    handleClick(){
      if (this.disabled) return
      let inputs = document.querySelectorAll(`[form-name^='${this.formName}']`)
      let formData = {}
      inputs.forEach(input => formData[input.name] = input.value)
      postAxios({interfaceName: this.interface, formData}).then(({data}) => {
        if(data.code === 200) {
          this.$message({
            message: this.submitText,
            type: 'success'
          });
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          });
        }
      })
    }
  },
  render(){
    let style = {
      color: this.color,
      textAlign: this.textAlign,
      fontSize: this.fontSize + 'px'
    }
    if (this.backgroundImg) {
      style = {
        ...style,
        'background-size': 'cover',
        'background-position': '50% 50%',
        'background-origin': 'content-box',
        'background-image': `url(${this.backgroundImg})`
      }
    } else {
      style = {
        ...style,
        background: this.background
      }
    }
    return (
      <button
        style={style}
        onClick={this.handleClick}
      >{this.text}</button>
    )
  }
}
