---
title: "JavaScript基础：作用域与闭包"
date: 2021-04-17 20:52:32
tags:
  - 知识点
  - 面试
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-16/ac67240f4b2ecbac5e29fe586ddf4c52.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

> 散落在各处，好像有体系，但是又没有体系的知识点或者题，收录在这些个散落的日志中。

这个部分，所有的基础知识都特别枯燥，很多人说到作用域闭包都是从JavaScript有什么样的作用域来说，其实要说到作用域和闭包，最基础的还是堆栈内存。
但是这些内容又及其枯燥，什么值类型在栈内存中，引用类型在堆内存中开辟一块空间，让如一个十六进制的地址在栈内存，巴拉巴拉的一堆东西，然后函数入栈出栈，很无聊。
所以，还是得从古怪的面试题来看。

### 第一题 引用类型

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x); // undefined
console.log(b); // {n: 1, x: {n: 2}}
```

这类问题，没有不能用画图解决的：
<img alt="" class="content-img" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-17/d01c6a9a1f3198d72a8ec0951d6d5812.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 第二题 函数执行处理

```js
var x = [12, 23];
function fn(y) {
    y[0] = 100;
    y = [100];
    y[1] = 200;
    console.log(y); // [100, 200]
}
fn(x);
console.log(x); // [100, 23]
```

题解：
<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-17/067cf98233fbed0366f2075d07922981.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 第三题 闭包

什么是闭包？很多面试喜欢问这样的问题，而且很多沙雕面试官喜欢听到的答案是：一个函数里面返回另一个函数，保存函数中的变量。这样的答案很low，因为闭包不是一种代码，而是一种编程机制。

真正闭包的解释应该是：
函数执行形成一个私有的上下文，此上下文中的的变量，和上下文以外的环境互不干扰，这种函数的保护机制称为闭包。
一般来讲，所有的函数都是闭包，但是一般函数上下文存在时间太短，执行完之后就释放掉了，不是一个有意义的闭包。
那种形成的上下文不被释放，不仅保护了私有变量，而且这些变量和存储的值也不被释放掉，保存起来了，后续可以被继续使用的，才是有意义的闭包。
所以闭包的意义就是：保护变量和保存变量。

```js
var x=100;
function fn(){
    var x=200;
    return function(y){
        console.log(y+x++);
    };
}
var f=fn();
f(10); // 210
f(20); // 221
```

题解：
<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-17/1c7a1bd8c0c93706d703c09539033dd8.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

#### 细节知识点：闭包应用之循环事件绑定的N种解决方法

> 强调一下闭包的概念（市面上大部分人的理解）：
> 函数执行形成的私有上下文，如果上下文中的某些内容（一般指的是堆内存地址）被上下文以外的一些事物（例如：变量、事件绑定等）所占用（浏览器的垃圾回收机制决定的），则当前上下文不能被出栈释放，这就是闭包。
> 其实，函数执行就会形成闭包，只是执行完之后，就被回收了，没有起到闭包应有的作用。
> 闭包的作用：保护私有上下文的私有变量和外界不相互影响。保存上下文中的变量和值不被释放。

这个题就是很多地方遇到的那种，好几个元素，点谁弹谁的下标的那个题（真他妈无聊）。

错误的做法：

```js
  const btns = document.querySelectorAll('button')
  for (var i = 0; i < btns.length; i++) {
    const btnEle = btns[i]
    btnEle.index = i
    btnEle.onclick = function () {
      console.log(i)
    }
  }
```

正确的做法1：闭包

```js
  const btns = document.querySelectorAll('button')
  for (var i = 0; i < btns.length; i++) {
    (function (i) {
      const btnEle = btns[i]
      btnEle.onclick = function () {
        console.log(i)
      }
    })(i)
  }
```

每一轮循环都会形成一个闭包，存储私有变量i的值（当前循环传递的i的值）：
 自执行函数执行，产生一个上下文EC(A)私有形参便令i=0、1、2...
 EC(A)上下文中创建一个小函数，并且让全局中的某一项占用创建的函数

所以，题解页也可以有其他写法，只要产生闭包，比如：

```js
  for (var i = 0; i < btns.length; i++) {
    const btnEle = btns[i]
    btnEle.onclick = (function (i) {
      return function () {
        console.log(i)
      }
    })(i)
  }
```

延展的知识点：

```js
  var obj = {
    fn: (function () {
      console.log('外面的函数')
      return function () {
        console.log('里面的函数')
      }
    })()
  }
  obj.fn()
  obj.fn()

  // '外面的函数'
  // '里面的函数'
  // '里面的函数'
```

obj.fn()没有调用的时候，就会执行一次自运行函数，将返回值赋给obj.fn。之后的两次调用只会执行返回的函数。

正确的做法2：var改成let，其实也是闭包

```js
  const btns = document.querySelectorAll('button')
  for (let i = 0; i < btns.length; i++) {
    const btnEle = btns[i]
    btnEle.onclick = function () {
      console.log(i)
    }
  }
```

正确的做法3：自定义属性

```js
  const btns = document.querySelectorAll('button')
  for (var i = 0; i < btns.length; i++) {
    const btnEle = btns[i]
    btnEle.myIndex = i
    btnEle.onclick = function () {
      console.log(this.myIndex)
    }
  }
```

正确的做法4：事件委托

这种方法有点诡辩，因为要改dom标签上的属性，将下标放在标签上。但是性能最好。

```js
document.body.onclick = function (ev) {
  var target = ev.target, targetTag = target.tagName;
  if (targetTag === 'BUTTON') {
    var index = target.getAttribute('index')
    console.log(index)
  }
}
```
