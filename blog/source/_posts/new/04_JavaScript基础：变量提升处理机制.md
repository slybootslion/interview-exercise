---
title: "JavaScript基础：变量提升处理机制"
date: 2021-04-19 13:57:44
tags:
  - 面试
  - 知识点
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-16/39d4f01130738fbaba059a35a15cbbe6.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

> 散落在各处，好像有体系，但是又没有体系的知识点或者题，收录在这些个散落的日志中。

##### 第一题

```js
  fn() // 5
  function fn() { console.log(1) }
  fn() // 5
  function fn() { console.log(2) }
  fn() // 5
  var fn = function () { console.log(3) }
  fn() // 3
  function fn() { console.log(4) }
  fn() // 3
  function fn() { console.log(5) }
  fn() // 3
```

首先是变量提升，声明并赋值一个函数，顺序执行，最终全局有一个名为fn的函数，内容是输出5。执行阶段，前三个执行都是输出5。输出1、2的声明式函数不会再复制，变量提升时候已经做过，不会重复做。
到表达式赋值的时候，全局下的fn被输出3的方法覆盖，之后三个都是输出3。输出4、5的声明式同样在变量提升的时候做出过，不会再重复做。

最终输出，3个5，3个3。

##### 第二题

```js
if (!('a' in window)) {
  var a = 1
}
console.log(a) // undefined
```

变量提升阶段，全局下有一个a属性值是undefined。
执行阶段，window下有个a，并取反，所以是false，if判断进不去，所以最终打印undefined。

##### 第三题

```js
var foo = 1
function bar () {
  if (!foo) var foo = 10
  console.log(foo) // 10
}
bar()
```

在bar函数内部，foo变量提升，不会再去函数外面找foo，变量提升后foo为undefined，符合判断条件，再赋值为10，所以最后打印10。

类似的题：

```js
var foo = 1
function bar () {
  if (false) var foo = 10
  console.log(foo) // undefined
}
bar()
```
