Promise.myAll = function (arr) {
  return new Promise((resolve, reject) => {
    let res = []
    if (!arr.length) return resolve(res)
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      if (![arr[i]] instanceof Promise) {
        res[i] = arr[i]
        if (++count === arr.length) resolve(res)
      } else {
        arr[i].then(data => {
          res[i] = data
          if (++count === arr.length) resolve(res)
        }, err => {
          reject(err)
        })
      }
    }
  })
}

promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i] instanceof Promise) {
        Promise.resolve(arr[i]).then(resolve, reject)
      } else {
        arr[i].then(resolve, reject)
      }
    }
  })
}
