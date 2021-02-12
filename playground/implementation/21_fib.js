const fib = (n) => {
  if (n < 1) return 0
  if (n <= 2) return 1
  let t1 = 1
  let t2 = 1
  for (let i = 2; i < n; i++) {
    const temp = t1
    t1 = t2
    t2 = t1 + temp
  }
  return t2
}
