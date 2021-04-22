---
title: "JavaScript基础：闭包作用域基础练习"
date: 2021-04-22 15:19:50
tags:
  - 面试
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-20/20ad7fba0091f8b4b8260b764f209f53.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 第一题

```js
var a = 10,
    b = 11,
    c = 12;
function test(a) {
    a = 1;
    var b = 2;
    c = 3;
}
test(10);
console.log(a, b, c);

// 10, 11, 3
```

太简单了，不解释。

### 第二题

```js
var a = 4;
function b(x, y, a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b(1, 2, 3);
console.log(a);

// 3
// 10
// undefined
```

认真一点不会错。
严格模式下，结果会不一样：3，3，undefined

题解： 

<img alt="" class="content-img" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-22/59f30019d8bfa2542fff0533c27e18d6.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>


### 第三题

```js
var a = 9;
function fn() {
    a = 0;
    return function (b) {
        return b + a++;
    }
}
var f = fn();
console.log(f(5));
console.log(fn()(5));
console.log(f(5));
console.log(a);

// 5
// 5
// 6
// 2
```

之前有一个类似的。
没有特别的难度，认真一点不会错。

### 第四题

```js
var test = (function (i) {
    return function () {
        alert(i *= 2);
    }
})(2);
test(5);
```
弹出字符串"4"。

### 第五题

```js
var x = 4;
function func() {
  return function (y) {
    console.log(y + (--x));
  }
}
var f = func(5);
f(6);
func(7)(8);
f(9);
console.log(x);

// 6 + 3 = 9
// 8 + 2 = 10
// 9 + 1 = 10
// 1
```

全局作用域x，没有什么特别的难度。

<!-- more -->

### 第六题

```js
var x = 5,
  y = 6;
function func() {
  x += y;
  func = function (y) {
    console.log(y + (--x));
  };
  console.log(x, y);
}
func(4);
func(3);
console.log(x, y);

// 11 6
// 13
// 10 6
```

### 第七题

```js
function fun(n, o) {
  console.log(o); // undefined -> n:1 o:0 0 ->  n:2 o:1 1 -> n:3 o:1 1
  return {
    fun: function (m) {
      return fun(m, n); // 1 0 -> 2 1 -> 3 1 
    }
  };
}
var c = fun(0).fun(1);
c.fun(2);
c.fun(3);

// undefined
// 0
// 1
// 1
```

有点绕，但不难理解，主要是认真。
陷阱点：对象.xxx() 是对象中的成员访问。 xxx() 是上下文中的某个变量，即存储的值函数，去执行。

图解：

<img alt="" class="content-img" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-22/a156848a29196cba71f16d165a2b6cbd.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 第八题

下面代码输出的结果是多少，为什么？如何改造一下，就能让其输出 20 10？

```js
var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();
console.log(b);

// function b() {}
// 10
```

这个是考察匿名函数具名化的问题。

匿名函数“具名化”：这样的写法是符合规范的
```js
const func = function func() {};
(function anonymous(){})();
```

匿名函数具名化，设置的名字不属于当前函数所在作用域中的变量
```js
(function b() {})();
console.log(b); //Uncaught ReferenceError: b is not defined
```

函数名只能在函数内部使用：好处就是，后期匿名函数也可以实现递归调用「严格模式下禁止arguments.callee的使用」
```js
"use strict";
(function b() {
    console.log(b); // 打印函数本身
    console.log(arguments.callee); //Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
})();
```

并且函数内部，直接修改它的值也是无效的
```js
(function b() {
    b = 10;
    console.log(b); // 打印函数本身
})();
```

除非函数内部重新声明了这个变量，则可以修改这个名字的值：基于var/let/const/function都可以
```js
(function b() {
    let b = 10;
    console.log(b); // 10
})();

// 或者

var b = 10;
(function b(b) {
    // 没有被声明过，b都是按照具名化的名字处理；但是不论基于何种方式一但被声明了，则按照变量处理，和函数名字没关系了；
    console.log(b); // 20
})(20);
console.log(b);
```

所以，这道题的答案是：先打印匿名函数具名化之后的函数，然后打印全局变量b。


### 第九题

实现函数fn，让其具有如下功能（百度真题）。
```js
let res = fn(1,2)(3);
console.log(res); //=>6  1+2+3
```

答案：

```js
function fn(...outerArgs) {
  return function anonymous(...innerArgs) {
    return outerArgs.concat(innerArgs).reduce(function handle(result, item) {
      return result + item;
    }, 0);
  };
}

// 箭头函数简化的写法

const fn = (...outerArgs) => (...innerArgs) => outerArgs.concat(innerArgs).reduce((result, item) => result + item, 0);
```

### 第十题

简述对闭包的理解，以及优缺点？

### 第十一题

var和let的区别？
