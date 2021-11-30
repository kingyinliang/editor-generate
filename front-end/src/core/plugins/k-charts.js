
import PropTypes from './plugin-props'
import VeLine from 'v-charts/lib/line.common'
import VeRadar from 'v-charts/lib/radar.common'
import VePie from 'v-charts/lib/pie.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeFunnel from 'v-charts/lib/funnel.common'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markArea'

function csv2VChartJson(csvArray){
  const columns = csvArray[0]
  const rows = csvArray.slice(1)
  const json = {
    columns,
    rows: rows.map((row) => {
      const obj = {}
      columns.forEach((col, colIndex) => {
        obj[col.trim()] = row[colIndex]
      })
      return obj
    })
  }
  return json
}

export default {
  name: 'k-charts',
  props: {
    dataset: PropTypes.colors({
      label: '颜色面板',
      visible: false,
      defaultValue: () => [
        ['日期', '销售量'],
        ['1月1日', 123],
        ['1月2日', 1223],
        ['1月3日', 2123],
        ['1月4日', 4123],
        ['1月5日', 3123],
        ['1月6日', 7123]
      ]
    }),
    type: PropTypes.input({
      label: '类型',
      defaultValue: 'line',
      visible: false
    }),
    colors: PropTypes.colors({
      label: '颜色面板',
      defaultValue: () => [
        '#19d4ae', '#5ab1ef', '#fa6e86',
        '#ffb980', '#0067a6', '#c4b4e4',
        '#d87a80', '#9cbbff', '#d9d0c7',
        '#87a997', '#d49ea2', '#5b4947',
        '#7ba3a8'
      ]
    })
  },
  mounted() {
    const resizeObserver = new ResizeObserver(entries => {
      // for (let entry of entries) {
      //   console.log(entry.target.style.width)
      // }
      this.$refs.kCharts.resize()
    })

    resizeObserver.observe(this.$el)
  },
  render() {
    const chartData = csv2VChartJson(this.dataset)
    switch (this.type) {
      case 'line':
        return <VeLine class='kCharts' ref='kCharts' width='100%' height='100%' data={chartData} colors={this.colors} />
      case 'histogram':
        return <VeHistogram class='kCharts' ref='kCharts' width='100%' height='100%' data={chartData} colors={this.colors} />
      case 'pie':
        return <VePie class='kCharts' ref='kCharts' width='100%' height='100%' data={chartData} colors={this.colors} />
      case 'funnel':
        return <VeFunnel class='kCharts' ref='kCharts' width='100%' height='100%' data={chartData} colors={this.colors} />
      case 'radar':
        return <VeRadar class='kCharts' ref='kCharts' width='100%' height='100%' data={chartData} colors={this.colors} />
      default:
        return null
    }
  }
}
