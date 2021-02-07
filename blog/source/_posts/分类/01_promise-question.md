---
title: "19道promise题"
date: 2021-02-07 15:48:24
tags:
  - 面试
---

<!--banner-pic|sticker|content-img|content-img-half-->
<img class="banner-pic" src="https://static.slybootslion.com/picture/undefined/blog/202102/07/7c993e3edd08e70cfa3631d5128d801b.png">

主要考察点
- 执行顺序
- 值透传
- 错误处理
- 返回值
- 链式调用
最终考察的还是对promise的理解程度。

### 01 ⭐⭐⭐

```js
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })
```

### 02 ⭐ 

```js
const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
})
promise.then(() => {
    console.log(3)
})
console.log(4)
```

### 03 ⭐⭐⭐

<font color=#f00 size=5>no pass</font>

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```

### 04 ⭐⭐

<font color=#f00 size=5>no pass</font>

```js
setTimeout(() => console.log(5), 0);

new Promise(resolve => {
  console.log(1);
  resolve(3);
  Promise.resolve().then(() => console.log(4))
}).then(num => {
  console.log(num)
});

console.log(2);
```

### 05 ⭐⭐

```js
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```

### 06 ⭐⭐

<font color=#f00 size=5>no pass</font>

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})
```

### 07 ⭐⭐⭐⭐

<font color=#f00 size=5>no pass</font>

```js
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
```

### 08 ⭐⭐⭐

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

### 09 ⭐⭐⭐

```js
Promise.resolve()
  .then(function success (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2 (e) {
    console.error('fail2: ', e)
  })
```

变种：
```js
Promise.resolve()
  .then(function success1 (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .then(function success2 (res) {
  }, function fail2 (e) {
    console.error('fail2: ', e)
  })
```

### 10 ⭐⭐⭐⭐

```js
process.nextTick(() => {
  console.log('nextTick')
})
Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
```

### 11 ⭐⭐⭐⭐

<font color=#f00 size=5>no pass</font>

```js
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
}));

first().then((arg) => {
    console.log(arg);
});
console.log(4);
```

### 12 ⭐⭐

```js
var p = new Promise((resolve, reject) => {
  reject(Error('The Fails!'))
})
p.catch(error => console.log(error.message))
p.catch(error => console.log(error.message))
```

### 13 ⭐⭐⭐

<font color=#f00 size=5>no pass</font>

```js
var p = new Promise((resolve, reject) => {
  return Promise.reject(Error('The Fails!'))
})
p.catch(error => console.log(error.message))
p.catch(error => console.log(error.message))
```

### 14 ⭐⭐

<font color=#f00 size=5>no pass</font>

```js
var p = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
  })
  .catch(error => console.log(error))
  .then(error => console.log(error))
```

### 15 ⭐⭐

<font color=#f00 size=5>no pass</font>

```js
new Promise((resolve, reject) => {
  resolve('Success!')
})
  .then(() => {
    throw Error('Oh noes!')
  })
  .catch(error => {
    return "actually, that worked"
  })
  .catch(error => console.log(error.message))
```

### 16 ⭐⭐

```js
Promise.resolve('Success!')
  .then(data => {
    return data.toUpperCase()
  })
  .then(data => {
    console.log(data)
    return data
  })
  .then(console.log)
```

### 17 ⭐⭐

```js
Promise.resolve('Success!')
  .then(() => {
    throw Error('Oh noes!')
  })
  .catch(error => {
    return 'actually, that worked'
  })
  .then(data => {
    throw Error('The fails!')
  })
  .catch(error => console.log(error.message))
```

### 18 ⭐⭐⭐⭐⭐

```js
async function async1() {
  console.log(1);
  const result = await async2();
  console.log(3);
}

async function async2() {
  console.log(2);
}

Promise.resolve().then(() => {
  console.log(4);
});

setTimeout(() => {
  console.log(5);
});

async1();
console.log(6);
```



<!-- more -->
<img class="banner-pic" src="https://static.slybootslion.com/picture/2f92363c-6832-4450-9e9a-080391fcd262/blog/202102/07/e144b2862ec9e808db17db949e544825.jpg">


答案： 
01: 
1, 2

02:
1, 2, 4, 3

03:
promise1 Promise {<pending>}
promise2 Promise {<pending>}
一秒后打印：
Error: error!!!
两秒后打印：
promise1 Promise { 'success' }
promise2 Promise { Error: error!!! }

04:
1, 2, 4, 3, 5

05:
then: success1

06:
一秒后打印：once，success 1018，success 1019

07:
[TypeError: Chaining cycle detected for promise #<Promise>]

08:
1

09:
fail2:  Error: error
变种的答案一样


10:
node环境
end, nextTick, then, setImmediate


11:
3, 7, 4, 1, 2, 5


12:
The Fails!
The Fails!


13:
UnhandledPromiseRejectionWarning: Error: The Fails!

14:
The Fails!
undefined

15:
没有输出

16:
SUCCESS!
SUCCESS!

17:
the fails!

18:
1, 2, 6, 4, 3, 5
