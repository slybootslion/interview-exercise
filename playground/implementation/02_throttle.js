function throttle (fun, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fun.call(this, ...args)
    }, delay)
  }
}
