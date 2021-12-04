import {parsePx} from '@/utils'

const cloneObj = (value) => JSON.parse(JSON.stringify(value))

const defaultStyle = {
  top: 100,
  left: 100,
  width: 100,
  height: 40,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: 14,
  margin: {
    top: {
      value: 0,
      unit: 'px'
    },
    right: {
      value: 0,
      unit: 'px'
    },
    bottom: {
      value: 0,
      unit: 'px'
    },
    left: {
      value: 0,
      unit: 'px'
    }
  },
  padding: {
    top: {
      value: 0,
      unit: 'px'
    },
    right: {
      value: 0,
      unit: 'px'
    },
    bottom: {
      value: 0,
      unit: 'px'
    },
    left: {
      value: 0,
      unit: 'px'
    }
  },
  border: {
    top: {
      value: 0,
      unit: 'px'
    },
    right: {
      value: 0,
      unit: 'px'
    },
    bottom: {
      value: 0,
      unit: 'px'
    },
    left: {
      value: 0,
      unit: 'px'
    },
    color: {
      value: '#000'
    },
    style: {
      value: 'solid'
    }
  },
  'border-style': 'solid',
  boxModelPart: ''
}

class Element {
  constructor(ele) {
    this.name = ele.name
    this.uuid = ele.uuid || + new Date()
    this.pluginProps = this.getPluginProps(ele)
    this.commonStyle = this.getCommonStyle(ele)
    this.animations = ele.animations || []
  }

  packPosData (obj, prefix) {
    let init = {}
    Object.keys(obj).forEach(key => {
      init[prefix + '-' + key] = obj[key].value + (obj[key].unit || '')
    })
    return init
  }

  packBorderData () {
    const { top, right, bottom, left, color, style } = this.commonStyle.border
    return {
      'border-width': `${top.value}${top.unit} ${right.value}${right.unit} ${bottom.value}${bottom.unit} ${left.value}${left.unit} `,
      'border-style': style.value,
      'border-color': color.value
    }
  }

  getStyle({position = 'static', isRem = false} = {}) {
    if (this.name === 'k-background') {
      return {
        width: '100%',
        height: '100%'
      }
    }
    const pluginProps = this.pluginProps
    const commonStyle = this.commonStyle
    const { margin, padding } = commonStyle
    const boxModel = {
      ...this.packPosData(margin, 'margin'),
      ...this.packPosData(padding, 'padding'),
      ...this.packBorderData()
    }
    let style = {
      top: parsePx(pluginProps.top || commonStyle.top, isRem),
      left: parsePx(pluginProps.left || commonStyle.left, isRem),
      width: parsePx(pluginProps.width || commonStyle.width, isRem),
      height: parsePx(pluginProps.height || commonStyle.height, isRem),
      fontSize: parsePx(pluginProps.fontSize || commonStyle.fontSize, isRem),
      color: pluginProps.color || commonStyle.color,
      // backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
      textAlign: pluginProps.textAlign || commonStyle.textAlign,
      'z-index': commonStyle.zindex,
      ...boxModel,
      position
    }
    return style
  }

  getCommonStyle(ele) {
    if (typeof ele.commonStyle === 'object') {
      return cloneObj(ele.commonStyle)
    }
    return {
      ...defaultStyle,
      zindex: ele.zindex || 0,
      ...ele.dragStyle // 拖拽结束落点的top、left
    }
  }

  getPluginProps(ele) {
    if (typeof ele.pluginProps === 'object') {
      return cloneObj({...ele.pluginProps, uuid: this.uuid})
    }
    return this.getDefaultPluginProps(ele)
  }

  getDefaultPluginProps(ele) {
    const {props = {}, shortcutProps = {}} = ele

    let pluginProps = {
      uuid: this.uuid
    }
    Object.keys(props).forEach(key => {
      const defaultValue = props[key].default
      pluginProps[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })

    pluginProps = {
      ...pluginProps,
      ...shortcutProps
    }

    return pluginProps
  }

  clone({zindex = this.commonStyle.zindex + 1} = {}) {
    return new Element({
      zindex,
      name: this.name,
      pluginProps: this.pluginProps,
      commonStyle: {
        ...this.commonStyle,
        top: this.commonStyle.top + 20,
        left: this.commonStyle.left + 20
      }
    })
  }
}

export default Element
