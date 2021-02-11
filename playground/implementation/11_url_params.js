function parseParam (url) {
  // 提取?后面的字符串
  const paramsStr = /.+\?(.+)$/.exec(url)[1]
  // 将字符串以&分割后存到数组中
  const paramsArr = paramsStr.split('&')
  let paramsObj = {}
  paramsArr.forEach(param => {
    if (/=/.test(param)) {// 处理有value的参数
      let [key, value] = param.split('=') // 分割key与value
      value = decodeURIComponent(value) // 解码
      value = /^\d+$/.test(value) ? parseFloat(value) : value // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], value)
      } else {
        paramsObj[key] = value
      }
    } else {
      paramsObj[param] = true
    }
  })
  return paramsObj
}
