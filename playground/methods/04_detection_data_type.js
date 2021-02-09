function typeOf (val) {
  return Object.prototype.toString.call(val).split(' ')[1].replace(']', '').toLowerCase()
}
