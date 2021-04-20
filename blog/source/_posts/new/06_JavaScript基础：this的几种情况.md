---
title: "JavaScript基础：this的几种情况"
date: 2021-04-20 13:30:52
tags:
  - 面试
  - 知识点
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-20/ffb2ee6fa4ab014730a931533630d660.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

> 散落在各处，好像有体系，但是又没有体系的知识点或者题，收录在这些个散落的日志中。

### 什么是this

一句话概括：函数的执行主体（不等价于执行上下文「作用域」）。

在浏览器端运行JS代码，非函数中的this一般都是window（严格模式下也是window）；
研究this都是研究函数中的this；
有一个特殊的，就是ES6+中“块级上下文”中的this，是其所在上下文中的this「理解为：块级上下文是没有自己this的」

想要分清楚函数执行的执行主体(this)，可以按照如下的规律来分析:
+ 事件绑定
  + 不论是DOM0还是DOM2级事件绑定，给元素E的某个事件行为绑定方法，当事件触发方法执行，方法中的this是当前元素E本身
  + 特殊情况
     + IE6~8中基于attachEvent实现DOM2事件绑定，事件触发方法执行，方法中的this不在是元素本身，大部分情况都是window
     + 如果基于call/apply/bind强制改变了函数中的this，我们也是以强制改变的为主
+ 普通函数执行
  + 函数执行，看函数前面是否有“点”，有“点”，“点”前面是谁this就是谁，没有“点”this是window「JS严格模式下是undefined」
    fn() -> this:window/undefined
    obj.fn() -> this:obj
    xxx.__proto__.fn() -> this:xxx.__proto__
    ...
  + 自执行函数执行：其内的this一般都是window/undefined
  + 回调函数中的this一般也是window/undefined，除非做过特殊的处理（特殊：比如forEach中的第二个参数）
  + 括号表达中的this很变态
  + ...
+ 构造函数执行
+ 箭头函数执行
+ 基于call/apply/bind强制改变this

事件绑定中的this：

```js
document.body.onclick = function () {
    console.log(this); // body
};
document.body.addEventListener('click', function () {
    console.log(this); // body
});
```
 
回调函数：把一个函数作为值，传递给另外一个函数，在另外一个函数执行中，把传递进来的函数执行...

```js
var obj = {
    name: 'zhufeng'
};
setTimeout(function () {
    console.log(this); //->window
}, 1000);
[10].forEach(function () {
    console.log(this); //->window
});
[10].forEach(function () {
    console.log(this); //->obj
}, obj);
```

自执行函数：

```js
var obj = {
  num: (function () {
    // 把自执行函数执行的返回值，赋值给obj.num成员
    console.log(this); //->window
    return 10;
  })()
};
```

直接调用函数，对象中函数，括号表达式中函数的this:

```js
function fn() {
    console.log(this);
}
var obj = {
    name: 'zhufeng',
    fn: fn
};
fn(); //this->window
obj.fn(); //this->obj
(obj.fn)(); //this->obj 小括号中只有一项，不算是括号表达式
(fn, 10, obj.fn)(); //this->window 小括号中有多项，只取最后一项，如果把其执行，不论之前this是谁，现在基本上都会变为window「括号表达式」 
```

<!-- more -->

#### 一道this面试题

```js
var x = 3,
    obj = {x: 5};
obj.fn = (function () {
    this.x *= ++x; // window.x = 3 * 4 = 12
    return function (y) {
        this.x *= (++x)+y;
        console.log(x);
    }
})();
var fn = obj.fn;
obj.fn(6); // y = 6 obj.x = 5 obj.x = 5 * (13 + 6) = 95  window.x = 13 
fn(4); // y = 4 obj.x = 95 window.x = 13 * (14 + 4) = 234
console.log(obj.x, x);

// 13
// 234
// 95 234
```

陷阱点：

```
a += a - b 是 a = a + a - b
a *= a - b 则是 a = a * (a - b)
```

题解：

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-20/9839665c0f4fef89c9eba17e4cf04438.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>
