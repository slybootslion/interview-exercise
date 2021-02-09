function curry (fun, ...args) {
  const len = fun.length
  return function (...args1) {
    const arr = [...args, ...args1]
    if (arr.length === len) {
      return fun(...arr)
    } else {
      return curry(fun, arr)
    }
  }
}
