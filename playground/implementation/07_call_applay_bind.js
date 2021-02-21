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

Function.prototype.myApply = function (ctx, args) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  ctx = ctx || window
  ctx = Object(ctx)
  const key = Symbol()
  ctx[key] = this
  const res = ctx[key](...args)
  delete ctx[key]
  return res
}

// 简写版（通过apply）
Function.prototype.myBind = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  ctx = Object(ctx || window)
  return (...args1) => {
    return this.apply(ctx, [...args, ...args1])
  }
}

// 加强版，考虑到返回的函数可以new
Function.prototype.myBindPlus = function (ctx, ...args) {
  if (typeof this !== 'function') throw new TypeError('类型错误')
  ctx = Object(ctx || window)
  const key = Symbol()
  ctx[key] = this

  const tempFn = function () {}
  const resFn = function () {
    return ctx[key].apply(
      // this instanceof resFn === true时,说明返回的resFn被当做new的构造函数调用
      this instanceof resFn ? this : ctx,
      args
    )
  }
  // 维护原型关系
  if (this.prototype) tempFn.prototype = this.prototype
  // 下行的代码使resFn.prototype是tempFn的实例,因此
  // 返回的resFn若作为new的构造函数,new生成的新对象作为this传入resFn,新对象的__proto__就是tempFn的实例
  resFn.prototype = new tempFn()
  return resFn
}
