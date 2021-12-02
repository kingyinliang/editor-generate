export function getEnum (items) {
  const labels = []
  const values = []
  const codes = []
  const options = []

  const code2value = {}
  const code2label = {}
  const value2label = {}
  items.forEach(item => {
    const [label, value, code] = item
    value2label[value] = label
    code2label[code] = label
    code2value[code] = value
    labels.push(label)
    values.push(value)
    codes.push(code)
    options.push({ label, value })
  })

  return {
    codes,
    values,
    labels,
    options,
    code2label,
    value2label,
    code2value
  }
}

const HTTP_API = 'httpApi'
const STATIC = 'static'
const CSV = 'csv'

// [label, value, code]
export default getEnum([
  ['静态数据源', STATIC, 'STATIC'],
  ['http/https', HTTP_API, 'HTTP_API'],
  ['CSV', CSV, 'CSV']
])

export const REFRESH_ENUM = getEnum([
  ['单次触发', 'once', 'ONCE'],
  ['定时更新', 'fixed', 'FIXED']
])

export const REFRESH_DEFAULT_INTERVAL = 2
