---
title: "金三银四突击队：第十天附加题"
date: 2021-03-06 09:04:39
tags:
  - 面试
  - 金三银四
---

### 第一题
> 按要求实现 go 函数？
```js
// 示例
go("l"); //gol
go()("l"); //gool
go()()("l"); //返回goool
```

就是个闭包

```js
function go (str) {
  let start = 'go'
  if (str) return start += str
  return function a(str2) {
    start += 'o'
    if (str2) return start += str2
    else return a
  }
}
```

### 第二题

> 实现一个myMap函数,实现类似map功能？

不废话，直接写

```js
Array.prototype.myMap = function (cb) {
  if (!Array.isArray(this)) throw new TypeError('error')
  if (typeof cb !== 'function') throw new TypeError('error')

  const len = this.length
  const arr = []
  for (let i = 0; i < len ; i++) {
    const item = this[i]
    const res = cb(item, i, this)
    arr.push(res)
  }
  return arr
}
```
