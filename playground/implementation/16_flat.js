function flatDeep (arr, count = 1) {
  return count > 0 ?
    arr.reduce(
      (res, cur) => res.concat(Array.isArray(cur) ?
        flatDeep(cur, count - 1) :
        cur
      ), []) :
    arr.slice()
}
