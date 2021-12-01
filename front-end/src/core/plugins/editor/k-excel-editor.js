import Spreadsheet from 'x-data-spreadsheet'
import KCsvImport from './k-csv-import-editor'

function excel2BinaryMatrix (excelData) {
  const rowsArray = Object.values(excelData.rows).filter(item => typeof item === 'object')
  const dataset = rowsArray.map(row => {
    const cells = Object.values(row.cells).map(item => item.text)
    return cells
  })
  console.log('dataset', dataset)
  return dataset
}
function binaryMatrix2excel (binaryMatrix) {
  const excelData = binaryMatrix.map((row) => {
    const cells = {}
    row.forEach((cellValue, cellIndex) => {
      cells[cellIndex] = { text: cellValue }
    })
    return { cells }
  })
  return excelData
}

export default {
  name: 'k-excel-editor',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    formatter: {
      type: Function,
      default: excel2BinaryMatrix
    }
  },
  computed: {
    innerItems: {
      get () {
        return binaryMatrix2excel(this.value)
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value () {
      this.refreshSheet({ rows: this.innerItems })
    }
  },
  methods: {
    binaryMatrix2excel (binaryMatrix) {
      const excelData = binaryMatrix.map((row) => {
        const cells = {}
        row.forEach((cellValue, cellIndex) => {
          cells[cellIndex] = { text: cellValue }
        })
        return { cells }
      })
      return excelData
    },
    parseCSV (csv) {
      const sheetData = this.binaryMatrix2excel(csv.data)
      this.$emit('change', csv.data)
      this.refreshSheet({ rows: sheetData })
    },
    refreshSheet (data) {
      this.sheet.loadData(data)
      this.sheet.reRender()
    },
    initSheet () {
      const ele = this.$refs.excel
      return this.sheet || new Spreadsheet(ele, {
        showToolbar: false,
        showGrid: true,
        showContextmenu: true
      }).change(excelData => {
        this.$emit('change', this.formatter(excelData))
      })
    }
  },
  mounted () {
    this.sheet = this.initSheet()
    this.refreshSheet({ rows: this.innerItems })
  },
  render() {
    return <div style="max-height: 320px;overflow:scroll;">
      <div style="line-height:2;">
        <span>方案1: <KCsvImport onParse={this.parseCSV} /></span>
        <span>方案2: 直接编辑 Excel</span>
        <div ref="excel" style="margin-right: 12px;width: 100%;overflow: scroll"></div>
      </div>
    </div>
  }
}
