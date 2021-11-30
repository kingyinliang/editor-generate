import Vue from 'vue'

import KBackground from './k-background'
import KPicture from './k-picture'
import KInput from './k-input'
import KVideo from './k-video'
import KButton from './k-button'
import KText from './k-text'
import KCharts from './k-charts'

export const pluginsList = [
  {
    i18nTitle: {
      'en-US': 'Background',
      'zh-CN': '背景'
    },
    title: '背景',
    icon: 'el-icon-thumb',
    component: KBackground,
    visible: false,
    name: KBackground.name
  },
  {
    title: '图片',
    i18nTitle: {
      'en-US': 'Picture',
      'zh-CN': '图片'
    },
    icon: 'Ktupian',
    component: KPicture,
    visible: true,
    name: KPicture.name
  },
  {
    title: '输入框',
    i18nTitle: {
      'en-US': 'Picture',
      'zh-CN': '输入框'
    },
    icon: 'Kshurukuang',
    component: KInput,
    visible: true,
    name: KInput.name
  },
  {
    title: '视频',
    i18nTitle: {
      'en-US': 'video',
      'zh-CN': '视频'
    },
    icon: 'Kdiv',
    component: KVideo,
    visible: true,
    name: KVideo.name
  },
  {
    title: '按钮',
    i18nTitle: {
      'en-US': 'Button',
      'zh-CN': '按钮'
    },
    icon: 'Kbutton',
    component: KButton,
    visible: true,
    name: KButton.name
  },
  {
    title: '文字',
    i18nTitle: {
      'en-US': 'Text',
      'zh-CN': '文字'
    },
    icon: 'Kwenzi',
    component: KText,
    visible: true,
    name: KText.name
  },
  {
    title: '折线图',
    i18nTitle: {
      'en-US': 'Line chart',
      'zh-CN': '折线图'
    },
    icon: 'Kzhexiantu-xianxing',
    component: KCharts,
    visible: true,
    name: KCharts.name,
    shortcutProps: {
      type: 'line'
    }
  },
  {
    title: '柱状图',
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '柱状图'
    },
    icon: 'Ktubiao-zhuzhuangtu',
    component: KCharts,
    visible: true,
    name: KCharts.name,
    shortcutProps: {
      type: 'histogram'
    }
  },
  {
    title: '饼状图',
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '饼状图'
    },
    icon: 'Kbingtu',
    component: KCharts,
    visible: true,
    name: KCharts.name,
    shortcutProps: {
      type: 'pie'
    }
  },
]

export default {
  data: () => ({
    pluginsList
  }),
  methods:{
    mixinPlugins2Editor () {
      pluginsList.forEach(plugin => {
        Vue.component(plugin.name, plugin.component)
      })
    }
  },
  created () {
    this.mixinPlugins2Editor()
  }
}
