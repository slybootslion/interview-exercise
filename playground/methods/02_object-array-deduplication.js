const origin = [
  { id: 1, a: 1 },
  { id: 2, a: 2 },
  { id: 3, a: 3 },
  { id: 1, a: 4 },
]

// 方法1
const obj = {}
const arr1 = origin.filter(item => obj[item.id] ? false : (obj[item.id] = true))
console.log(arr1)

// 方法2
const map = new Map()
const arr2 = []
for (const item of origin) {
  if (!map.has(item.id)) {
    map.set(item.id, item)
    arr2.push(item)
  }
}
console.log(arr2)

// 方法3 reduce + includes
const arr3 = origin.reduce((acc, cur) => {
  const arr = acc.map(item => item.id)
  return arr.includes(cur.id) ? acc : [...acc, cur]
}, [])
console.log(arr3)
