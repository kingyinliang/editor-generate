export default {
  name: 'k-color-picker',
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    inputVal: ''
  }),
  mounted() {
    this.inputVal = this.value
  },
  render () {
    return <div style="display: flex;">
      <el-color-picker
        size="small"
        showAlpha={true}
        value={this.value}
        onChange={newColorString => {
          this.inputVal = newColorString
          this.$emit('change', newColorString)
        }}
      />
      <el-input
        type="text"
        vModel={this.inputVal}
        size="small"
        style="flex: 1; margin-left: 15px;"
        onChange={newColorString => {
          this.$emit('change', newColorString)
        }}
      />
    </div>
  }
}
