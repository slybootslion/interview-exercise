function instanceOf (instance, Object) {
  const prototype = Object.prototype
  instance = instance.__proto__
  while (true) {
    if (instance === null) return false
    if (prototype === instance) return true // 这个是判断的依据
    instance = instance.__proto__
  }
}
