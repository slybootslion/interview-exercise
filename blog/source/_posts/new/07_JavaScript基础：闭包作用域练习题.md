---
title: "JavaScript基础：闭包作用域练习题"
date: 2021-04-21 12:06:52
tags:
  - 面试
---

<!--banner-pic|sticker|content-img|content-img-half-->

#### 第一题

```js
console.log(a, b, c); 
var a = 12,
    b = 13,
    c = 14;
function fn(a) {
    console.log(a, b, c); 
    a = 100;
    c = 200;
    console.log(a, b, c); 
}
b = fn(10);
console.log(a, b, c); 

// undefined undefined undefined
// 10 13 14
// 100 13 200
// 12 undefined 200
```

变量提升和作用域的问题，太简单了，不解释。

#### 第二题

```js
var i = 0;
function A() {
    var i = 10;
    function x() {
        console.log(i);
    }
    return x;
}
var y = A();
y();
function B() {
    var i = 20;
    y();
}
B();

// 10
// 10
```

闭包的知识。

#### 第三题

```js
var a = 1;
var obj = {
  name: "tom"
}
function fn() {
  var a2 = a;
  obj2 = obj;
  a2 = a;
  obj2.name = "jack";
}
fn();
console.log(a); // 1
console.log(obj); // {name: 'jack'}
```

毫无难度。

#### 第四题

```js
var a = 1;
function fn(a){
    console.log(a)
    var a = 2;
    function a(){}
    console.log(a)
}
fn(a);
console.log(a)
// function a() {}
// 2
// 1
```

首先，网上很多地方写的：函数声明式优先于var声明的说法，是扯淡。

题解：
函数内部执行顺序，形参声明加赋值`a = 1` ---> 变量提升`var a`，因为之前形参已经赋值，所以这里的var声明不会起作用 ---> 函数声明并重新赋值`a = f(){}` ---> 打印输出`f(){}` ---> 函数作用域内重新赋值`a = 2` ---> 打印输出`2` ---> 全局变量a没有变过 ---> 打印输出`1`

拓展

```js
function a(x) {
  x = 1
}
a(2)
console.log(window.x);
console.log(x);
// undefined
// 报错：Uncaught ReferenceError: x is not defined
```

说明：形参赋值，已经确定了x的作用域。

#### 第五题

```js
console.log(a); 
var a=12; 
function fn(){
  console.log(a); 
  var a=13;   
}
fn();   
console.log(a);
// undefined
// undefined
// 12
```

变量提升相关，没什么难度


第五题变种：

```js
console.log(a); 
var a=12;
function fn(){
  console.log(a);
  a=13;
}
fn();
console.log(a);
// undefined
// 12
// 13
```

第五题变种2：

```js
console.log(a);
a=12;
function fn(){
    console.log(a);
    a=13;   
}
fn();
console.log(a);
// 报错Uncaught ReferenceError: a is not defined，不会继续执行
```

<!-- more -->

#### 第六题

```js
var foo='hello'; 
(function(foo){
   console.log(foo);
   var foo=foo||'world';
   console.log(foo);
})(foo);
console.log(foo);
// hello
// hello
// hello
```

太简单了，不知道难度在哪儿。

#### 第七题

新老浏览器会有区别，为了兼容ES5和ES6代码块的区别，会有不同的输出。
如果哪个面试敢出这种题给我，我就一巴掌拍死他。

```js
{
  function foo() { }
  foo = 1;
}
console.log(foo);
// function () {}
```

题解：

<img alt="" class="content-img" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-21/3e61d1d50fdfee7f7b674b34b2e9082e.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

```js
{
  function foo() { }
  foo = 1;
  function foo() { }
}
console.log(foo);
// 1
```

```js
{
  function foo() { }
  foo = 1;
  function foo() { }
  foo = 2;
}
console.log(foo);
// 1
```

#### 第八题

```js
var x = 1
function func (x, y = function anonymous(){x = 2}) {
  x = 3
  y()
  console.log(x)
}
func(5)
console.log(x)

// 2
// 1
```

题解：
参数中的anonymous中x前面没有var等声明字符，x会修改上一级作用域中的x值，就是func中的x。

<img alt="" class="content-img" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-21/ffd0da8362e78bbabb4988ba860a8daa.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

```js
var x = 1
function func (x, y = function anonymous(){x = 2}) {
  var x = 3
  y()
  console.log(x)
}
func(5)
console.log(x)
// 3
// 1
```

题解：

<img alt="" class="content-img" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-21/9b882861471b4d94ccd2410e1a249a30.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

```js
var x = 1
function func (x, y = function anonymous1(){x = 2}) {
  var x = 3
  var y = function anonymous2(){x = 4}
  y()
  console.log(x)
}
func(5)
console.log(x)
// 4
// 1
```
