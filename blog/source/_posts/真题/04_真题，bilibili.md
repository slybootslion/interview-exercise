---
title: "真题04 -- bilibili"
date: 2021-02-08 17:57:41
tags:
  - 面试
  - 真题
---

<!--banner-pic|sticker|content-img|content-img-half-->
<img class="banner-pic" src="http://oss.slybootslion.com/blog/v2-def179b51e7022e7cc789d364aa6fd15_r.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 01 CSS3中transition和animation的属性分别有哪些

核心答案：一个是过渡动画，一个帧动画

### 02 什么是盒模型

太基础了。

指的是页面在渲染时，DOM元素所采用的布局模型，一个元素占用的空间大小由几个部分组成，内容(content)、内边距(padding)，边框(border)和外边距(margin)。
可以通过box-sizing来进行设置，其中IE盒模型的content包含了padding和border，这是区别于W3C标准盒模型的地方。

### 03 选择器优先级

!important > 行内样式 > id选择器 > class选择器 > 标签选择器 > * > 继承 > 默认

### 04 forEach，map和filter的区别

forEach遍历数组，参数为一个回调函数，回调函数接收三个参数，当前元素，元素索引，整个数组；
map与forEach类似，遍历数组，但其回调函数的返回值会组成一个新数组，新数组的索引结构和原数组一致，原数组不变；
filter会返回原数组的一个子集，回调函数用于逻辑判断，返回true则将当前元素添加到返回数组中，否则排除当前元素，原数组不变。

### 05 函数柯里化

一道常考的手写

```js
function curry (fun, ...args) {
  const len = fun.length
  return function (...args1) {
    const arr = [...args, ...args1]
    if (arr.length === len) {
      return fun(...arr)
    } else {
      return curry(fun, arr)
    }
  }
}
```

### 06 跨标签页的通讯方式有哪些

<font color=#f00 size=5>no pass</font>

这个有空详解看一下，算是盲区

* BroadCast Channel
* Service Worker
* LocalStorage + window.onstorage监听
* Shared Worker + 定时器轮询(setInterval)
* IndexedDB + 定时器轮询(setInterval)
* cookie + 定时器轮询(setInterval)
* window.open + window.postMessage
* Websocket

### 07 实现一个函数判断数据类型

基础手写

```js
function typeOf(val) {
  return Object.prototype.toString.call(val).split(' ')[1].replace(']', '').toLowerCase()
}
```


答案：
<!-- more -->

1：
transition 过渡动画：
* transition-property：属性名称
* transition-duration: 间隔时间
* transition-timing-function: 动画曲线
* transition-delay: 延迟

animation 关键帧动画：
* animation-name：动画名称
* animation-duration: 间隔时间
* animation-timing-function: 动画曲线
* animation-delay: 延迟
* animation-iteration-count：动画次数
* animation-direction: 方向
* animation-fill-mode: 禁止模式


