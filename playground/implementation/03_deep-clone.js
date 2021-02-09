// 需要掌握的版本
function deepClone (value) {
  if (value instanceof RegExp) return new RegExp(value)
  if (value instanceof Date) return new RegExp(value)
  const isObj = (v) => typeof v === 'object' && v != null
  const obj = Array.isArray(value) ? [...value] : { ...value }
  Reflect.ownKeys(value).forEach(key => {
    obj[key] = isObj(value[key]) ? deepClone(value[key]) : value[key]
  })
  return obj
}

// 精进版
function deep_clone (value) {
  const isType = (obj, type) => {
    if (typeof obj !== 'object') return false
    const typeString = Object.prototype.toString.call(obj)
    let flag
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]'
        break
      case 'Date':
        flag = typeString === '[object Date]'
        break
      case 'RegExp':
        flag = typeString === '[object RegExp]'
        break
      default:
        flag = false
    }
    return flag
  }
  // 正则的特殊处理
  const getRegExp = (v) => {
    let flags = ''
    if (v.global) flags += 'g'
    if (v.ignoreCase) flags += 'i'
    if (v.multiline) flags += 'm'
    return flags
  }
  // 防止循环引用的数组
  const values = []
  const objs = []

  const _clone = value => {
    if (value === null) return null;
    if (typeof value !== 'object') return value;

    let obj, proto
    if (isType(value, 'Array')) {
      obj = []
    } else if (isType(value, 'RegExp')) {
      obj = new RegExp(value.source, getRegExp(value))
      if (value.lastIndex) obj.lastIndex = value.lastIndex
    } else if (isType(value, 'Date')) {
      obj = new Date(value.getTime())
    } else {
      console.log(value)
      proto = Object.getPrototypeOf(value)
      // 切断原型链
      obj = Object.create(proto)
    }
    const index = values.indexOf(value)
    if (index !== -1) return objs[index]
    values.push(value)
    objs.push(obj)
    for (const valueKey in value) {
      obj[valueKey] = _clone(value[valueKey])
    }
    return obj
  }
  return _clone(value)
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};

const r = deepClone(target)
// 简版
const newObj = JSON.parse(JSON.stringify(target))
const obj = deep_clone(target)
target.field4[1] = 3

console.log(target)
console.log(r)
console.log(newObj)
console.log(obj)

