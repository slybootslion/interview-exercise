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
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

// 测试用例
/*
const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
}
target.target = target;
const obj = deepClone(target)
obj.reg = 'abc'
console.log(target)
console.log(obj)
* */
