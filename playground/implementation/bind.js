Function.prototype.bind = function (obj, ...args) {
  if (typeof this !== "function") throw new TypeError('类型错误')
  obj = obj || window
  return args1 => {
    this.apply(obj, [...args, ...args1])
  }
}
