---
title: "JavaScript核心考点（基础版）04：原型链与继承"
date: 2021-02-10 20:51:10
tags:
  - 面试
  - 原型
---

<img class="banner-pic" src="http://oss.slybootslion.com/blog/v2-24e6ee70cb245f8c11012c08245f2313_r.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

<!--banner-pic|sticker|content-img|content-img-half-->
### 原型和原型链

原型：在JavaScript中原型是一个prototype对象，用于表示类型之间的关系。

原型链：JavaScript万物都是对象，对象和对象之间也有关系，并不是孤立存在的。对象之间的继承关系，在JavaScript中是通过prototype对象指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条，专业术语称之为原型链。

```js
var Person = function() {
  this.age = 18
  this.name = '匿名'
}
var Student = function() {}
//创建继承关系,父类实例作为子类原型
Student.prototype = new Person()
var s1 = new Student()
console.log(s1)
```

原型关系图：

<img class="content-img" src="https://camo.githubusercontent.com/409f277862f2bf7544df8d2f3c925cff9b8d8c60c374421ce787a243882ae91a/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f32342f313639623035356164353762313064653f773d36303926683d383326663d706e6726733d36313239"/>

当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__（即它的构造函数的prototype）中寻找。如果一直找到最上层都没有找到，那么就宣告失败，返回undefined。最上层是什么 —— Object.prototype.__proto__ === null

<img class="content-img" src="https://camo.githubusercontent.com/c26099e84dbc0f6d36019d12518abf5598d6b76659a38c039f8da0b59e945391/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f32342f313639623035366539383163623265363f773d35313126683d32393026663d706e6726733d3239383537"/>

### 继承

介绍几种常见继承方式：

##### 原型链+借用构造函数的组合继承

```js
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()
const child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

以上继承的方式核心是在子类的构造函数中通过 Parent.call(this) 继承父类的属性，然后改变子类的原型为 new Parent() 来继承父类的函数。

这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。

##### 寄生组合继承：这种继承方式对上一种组合继承进行了优化

> my tips:
> ES6之前的继承方法，记住这一个就行

```js
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value) //这行是核心
}
// 下面是寄生的核心
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
const child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。

##### ES6中class 的继承
ES6中引入了class关键字，class可以通过extends关键字实现继承，还可以通过static关键字定义类的静态方法,这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。需要注意的是，class关键字只是原型的语法糖，JavaScript继承仍然是基于原型实现的。
```js
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```
class 实现继承的核心在于使用 extends 表明继承自哪个父类，并且在子类构造函数中必须调用 super，因为这段代码可以看成 `Parent.call(this, value)`。
