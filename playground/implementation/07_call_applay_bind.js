Function.prototype.myCall = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  ctx = ctx || window
  ctx = Object(ctx)
  const key = Symbol()
  ctx[key] = this
  const res = ctx[key](...args)
  delete ctx[key]
  return res
}

Function.prototype.myApply = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  ctx = ctx || window
  ctx = Object(ctx)
  const key = Symbol()
  ctx[key] = this
  const res = ctx[key](args)
  delete ctx[key]
  return res
}

// 简写版（通过apply）
Function.prototype.myBind = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  ctx = Object(ctx || window)
  return function (...args1) {
    return this.apply(ctx, [...args, ...args1])
  }
}

// 加强版，考虑到返回的函数可以new
Function.prototype.myBindPlus = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  ctx = Object(ctx || window)
  const key = Symbol()
  ctx[key] = this

  const fNOP = function () {}
  const fBound = function () {
    return ctx[key].apply(
      // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
      this instanceof fBound ? this : ctx,
      args
    )
  }
  // 维护原型关系
  if (this.prototype) fNOP.prototype = this.prototype
  // 下行的代码使fBound.prototype是fNOP的实例,因此
  // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
  fBound.prototype = new fNOP()
  return fBound
}
