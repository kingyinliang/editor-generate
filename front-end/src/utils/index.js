import Vue from 'vue'
import { cloneDeep } from 'lodash'
import Element from 'core/models/element.js'
import Http from './axios'
import { DS } from '@/store/modules/editor/data-source'

const DESIGN_DRAFT_WIDTH = 375

export function getVM (pluginName) {
  const Ctor = Vue.component(pluginName)
  return new Ctor()
}

export function px2Rem (px) {
  const number = Math.pow(10, 6)
  const val = (px / (DESIGN_DRAFT_WIDTH / 10)) * number
  const rem = Math.round(val) / number + 'rem'
  return rem
}

export function parsePx (px, isRem = false) {
  if (isRem) return px2Rem(px)
  return `${px}px`
}

export function getVMVal (vm, exp) {
  let val = vm
  exp = exp.split('.')
  exp.forEach(k => {
    try {
      val = val[k]
    } catch (error) {
      val = undefined
    }
  })
  return val
}
function _getVMVal (vm, exp) {
  try {
    const _getVMValFn = new  Function('DS', `return ${exp}`)
    return _getVMValFn(vm)
  } catch (e) {
    return 'error'
  }
}
export function bindData (element) {
  const reg = /\{\{(.*?)\}\}/g
  const objStr = JSON.stringify(element.pluginProps)
  const Ctor = Vue.component(element.uuid,)
  // const vm = new Ctor()
  const newObjStr = objStr.replace(reg, (match, exp) => {
    // exp = exp.trim().replace(/\[(\w+)\]/g, '.$1')
    exp = exp.trim().replace(/^\./, '')
    if (/DS\./.test(exp)) {
      // return getVMVal(DS, exp)
      console.log(DS.DS, exp);
      let value = _getVMVal(DS.DS, exp)
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      if (value) {
        // eslint-disable-next-line
        return value.replace(/\"/g, '\\"')
      } else {
        return value
      }
    } else if (Ctor) {
      const vm = new Ctor()
      console.log(vm, element.uuid);
      console.log(_getVMVal(vm, exp));
      
    }
    return exp
  })
  const newObj = JSON.parse(newObjStr)
  return newObj
}

export function elementClone(element, zindex) {
  return new Element({
    name: element.name,
    pluginProps: element.pluginProps,
    commonStyle: {
      ...element.commonStyle,
      zindex,
      top: element.commonStyle.top + 20,
      left: element.commonStyle.left + 20
    }
  })
}

export function postAxios({interfaceName='', formData} = {}) {
  return Http.post(interfaceName, formData)
}

export class UndoRedoHistory {
  store;
  history = [];
  currentIndex = -1;

  get canUndo () {
    return this.currentIndex > 0
  }

  get canRedo () {
    return this.history.length > this.currentIndex + 1
  }

  init(store){
    this.store = store
  }

  addState(state) {
    if (this.currentIndex + 1 < this.history.length) {
      this.history.splice(this.currentIndex + 1)
    }
    this.history.push(state)
    this.currentIndex++
  }

  undo() {
    if (!this.canUndo) return
    const prevState = this.history[this.currentIndex - 1]
    this.store.replaceState(cloneDeep(prevState))
    this.currentIndex--
  }

  redo() {
    if (!this.canRedo) return
    const nextState = this.history[this.currentIndex + 1]
    this.store.replaceState(cloneDeep(nextState))
    this.currentIndex++
  }

}

export const undoRedoHistory = new UndoRedoHistory()
