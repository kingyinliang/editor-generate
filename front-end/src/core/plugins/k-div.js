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
const borderStyleOptions = [
  {
    label: '无',
    value: 'none'
  },
  {
    label: '实线',
    value: 'solid'
  },
  {
    label: '双线',
    value: 'double'
  },
  {
    label: '虚线',
    value: 'dashed'
  },
  {
    label: '点状边框',
    value: 'dotted'
  },
  {
    label: '3D 凹槽边框',
    value: 'groove'
  },
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
    borderLeft: PropTypes.select({ label: '左边框', defaultValue: 'solid', options: borderStyleOptions }),
    borderTop: PropTypes.select({ label: '上边框', defaultValue: 'solid', options: borderStyleOptions }),
    borderRight: PropTypes.select({ label: '右边框', defaultValue: 'solid', options: borderStyleOptions }),
    borderBottom: PropTypes.select({ label: '下边框', defaultValue: 'solid', options: borderStyleOptions }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 1 }),
    borderRadius: PropTypes.number({ label: '边框圆角(px)', defaultValue: 5 }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
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
  render(){
    let style = {
      boxShadow: `${this.boxShadowX}px ${this.boxShadowY}px ${this.boxShadowWidth}px ${this.boxShadowColor} ${this.boxShadow}`,
      borderLeft: this.borderLeft,
      borderTop: this.borderTop,
      borderRight: this.borderRight,
      borderBottom: this.borderBottom,
      borderColor: this.borderColor,
      borderRadius: this.borderRadius + 'px',
      borderWidth: this.borderWidth + 'px',
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
