export default {
  input:({ valueType = String, label = '输入', defaultValue = '请输入',  visible = true} = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: 'el-input',
      label
    }
  }),
  number:({ valueType = Number, label = '输入', defaultValue = 12,  visible = true} = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: 'el-input-number',
      label,
    }
  }),
  radio: ({ valueType = String, label = '选项', defaultValue = '',  visible = true, options = [] } = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: 'k-radio-editor',
      label,
      props: {
        options,
      }
    }
  }),
  select: ({ valueType = String, label = '选项', defaultValue = '',  visible = true, options = [] } = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: 'k-select-editor',
      label,
      props: {
        options,
      }
    }
  }),
  upload: ({ valueType = String, defaultValue = '', visible = true, label = '选项' } = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: 'k-upload-editor',
      label
    }
  }),
  color: ({ valueType = String, defaultValue = '#ffffff', visible = true, label = '颜色面板' } = {}) => ({
    type: valueType,
    default: defaultValue,
    visible,
    editor: {
      type: 'k-color-picker',
      label,
      props: {
        size: 'mini',
        showAlpha: true
      },
    }
  }),
  colors: ({ defaultValue = () => [], visible = true, label = '颜色面板' } = {}) => ({
    type: Array,
    default: defaultValue,
    visible,
    editor: {
      type: 'k-colors-panel-editor',
      label,
      props: {
        size: 'mini',
        showAlpha: true
      },
      require: true
    }
  }),
  boolean: ({ defaultValue = false, visible = true, label = '开关' } = {}) => ({
    type: Boolean,
    default: defaultValue,
    visible,
    editor: {
      type: 'el-switch',
      label
    }
  }),
  excel: ({ label = '数据源', defaultValue = [], visible = true } = {}) => ({
    type: Array,
    default: defaultValue,
    visible,
    editor: {
      type: 'k-excel-editor',
      label,
    }
  }),
}
