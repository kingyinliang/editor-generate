import PropTypes from "./plugin-props";

const boxShadow = [
  {
    label: '外阴影',
    value: ''
  },
  {
    label: '内阴影',
    value: 'inset'
  }
]
const onClickOptions = [
  {
    label: '无',
    value: ''
  },
  {
    label: '跳转',
    value: 'jump'
  },
  {
    label: '弹窗',
    value: 'dialog'
  },
]

export default {
  name: 'k-div',
  props: {
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: '#ffffff' }),
    backgroundImg: PropTypes.upload({label: '背景图'}),
    boxShadowColor: PropTypes.color({ label: '阴影色', defaultValue: '#000' }),
    boxShadow: PropTypes.radio({ defaultValue: '', label: '阴影', options: boxShadow}),
    boxShadowX: PropTypes.number({ label: 'X轴阴影(px)', defaultValue: 0 }),
    boxShadowY: PropTypes.number({ label: 'Y轴阴影(px)', defaultValue: 0 }),
    boxShadowWidth: PropTypes.number({ label: '阴影模糊值(px)', defaultValue: 0 }),
    onClickFn: PropTypes.select({label: '点击交互', defaultValue: '', options: onClickOptions}),
    jumpUrl: PropTypes.input({label: '跳转链接', defaultValue: ''}),
    dialogNumber: PropTypes.number({label: '弹窗', defaultValue: 1}),
  },
  methods:{
    onClick(){
      if (!this.onClickFn) return
      if (this.onClickFn === 'jump') {
        window.location.href = this.jumpUrl
      }
      if (this.onClickFn === 'dialog') {
        let dialogArr = document.getElementsByClassName('k-dialog')
        if (dialogArr.length) {
            dialogArr[this.dialogNumber - 1].style.display = "block";
        }
      }
    }
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
  render(){
    let style = {
      boxShadow: `${this.boxShadowX}px ${this.boxShadowY}px ${this.boxShadowWidth}px ${this.boxShadowColor} ${this.boxShadow}`
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
        backgroundColor: this.backgroundColor
      }
    }
    return(
      <div style={style} onClick={() => this.onClick()}/>
    )
  }
}
