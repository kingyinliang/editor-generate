export default {
  name: 'k-color-picker',
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.inputVal = this.value
      }
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
          console.log(newColorString);
          this.$emit('change', newColorString)
        }}
      />
    </div>
  }
}
