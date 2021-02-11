// 方法1 转数组
function turnHump (str) {
  return str.split('-').map((item, index) => {
    if (index > 0) item = item[0].toUpperCase() + item.slice(1)
    return item
  }).join('')
}

// 方法2 正则
function turn_hump(str) {
  return str.replace(/-\w/g, function(x) {
    return x.slice(1).toUpperCase();
  })
}
