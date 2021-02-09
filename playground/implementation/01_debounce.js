function debounce (fun, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fun.call(this, ...args)
      timer = null
    }, delay)
  }
}
