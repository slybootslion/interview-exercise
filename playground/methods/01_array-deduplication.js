let origin = [1, 2, 3, 4, 5, 3, 2, 4, 1];

// 方式1 Array.from
const arr1 = Array.from(new Set(origin))
console.log(arr1)


// 方式2 includes
const arr2 = []
for (let i = 0; i < origin.length; i++) {
  if (arr2.includes(origin[i])) continue
  arr2.push(origin[i])
}
console.log(arr2)

// 方式3 Map
const arr3 = []
const map = new Map()
for (const item of origin) {
  if (!map.has(item)) {
    arr3.push(item)
    map.set(item, true)
  }
}
console.log(arr3)


// 方式4 双重遍历
const arr4 = [...origin]
for (let i = 0; i < arr4.length; i++) {
  for (let j = i + 1; j < arr4.length; j++) {
    if (arr4[i] === arr4[j]) {
      arr4.splice(j, 1)
      j--
    }
  }
}
console.log(arr4)


// 方式5 filter 奇技淫巧没啥意思
const obj = {}
const arr5 = origin.filter(
  item => obj[typeof item + item] ? false : (obj[typeof item + item] = true))
console.log(arr5)
