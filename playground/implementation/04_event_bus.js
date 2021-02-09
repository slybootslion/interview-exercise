// 简版
class EventBus {
  constructor (maxListeners = 10, events = new Map()) {
    this.events = events
    this.maxListeners = maxListeners
  }

  // 订阅
  on (eventKey, fn) {
    if (!this.events[eventKey]) this.events.set(eventKey, fn)
  }

  // 发布
  emit (eventKey, ...args) {
    const fn = this.events.get(eventKey)
    if (fn) fn.call(this, ...args)
    return true
  }
}

// 进阶版
class EventBus2 {
  constructor (maxListeners = 10, events = new Map()) {
    this.events = events
    this.maxListeners = maxListeners
  }

  on (eventKey, fn) {
    const fnArr = this.events.get(eventKey)
    if (!fnArr) {
      this.events.set(eventKey, [fn]) // 以数组形式保存，可以保存多个方法
    } else {
      fnArr.push(fn)
    }
  }

  emit (eventKey, ...args) {
    const fnArr = this.events.get(eventKey)
    fnArr.forEach(fn => fn.call(this, ...args))
    return true
  }

  remove (eventKey, fn) {
    const fnArr = this.events.get(eventKey)
    if (fnArr && fnArr.length) {
      if (fn && typeof fn === 'function') {
        for (let i = 0; i < fnArr.length; i++) {
          if (fn && fnArr[i] === fn) {
            fnArr.splice(i, 1)
          }
        }
        !fnArr.length && this.events.delete(eventKey)
      } else {
        this.events.delete(eventKey)
      }
    } else {
      return this
    }
  }
}

/*const bus = new EventBus()

bus.on('test1', () => console.log('test1'))

setTimeout(() => {
  bus.emit('test1')
}, 3000)*/

const bus2 = new EventBus2()

const fn3 = () => console.log('test3')

bus2.on('test2', () => console.log('test2'))
bus2.on('test2', () => console.log('test2'))
bus2.on('test2', () => fn3)

setTimeout(() => {
  bus2.remove('test2', fn3)
}, 1000)

setTimeout(() => {
  bus2.emit('test2')
}, 3000)
