// 其他map、find、findIndex 大同小异
Array.prototype.filter = function (cb, ctx) {
  if (typeof cb !== 'function') throw new TypeError('类型错误')
  if (!Array.isArray(this)) throw new TypeError('类型错误')
  const len = this.length
  const arr = []
  for (let i = 0; i < len; i++) {
    if (!this.hasOwnProperty(i)) continue
    cb.call(ctx, this[i], i, this) && arr.push(this[i])
  }
  return arr
}

Array.prototype.myReduce = function (cb, initVal) {
  if (!Array.isArray(this)) throw new TypeError('类型错误')
  let i = 0
  if (typeof initVal === 'undefined') {
    initVal = this[i]
    i++
  }
  while (i < this.length) {
    initVal = cb(initVal, this[i])
    i++
  }
  return initVal
}

