function deepClone (obj) {
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)

  if (isObj(obj)) {

  }

  function isObj (o) {
    return typeof o === 'object' && o != null
  }

  const object = Array.isArray(obj) ? [...obj] : { ...obj }

  Reflect.ownKeys(object).forEach(key => object[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key])

  return object
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
target.field4[1] = 3
console.log(target)
console.log(r)
