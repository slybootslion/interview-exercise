function newFun () {
  const obj = Object.create({})
  const [constructor, ...args] = [...arguments]
  obj.__proto__ = constructor.prototype
  const res = constructor.apply(obj, args)
  return typeof res === 'object' && res != null ? res : obj
}
