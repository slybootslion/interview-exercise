---
title: "JavaScript核心考点（基础版）01：变量类型"
date: 2021-02-09 16:17:01
tags:
  - 面试
  - 总结
---

<!--banner-pic|sticker|content-img|content-img-half-->
<img class="banner-pic" src="http://oss.slybootslion.com/blog/v2-b4424734658c06b4ac1330b0da5a8dd8_r.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>


### 1.JS 的数据类型分类
根据 JavaScript 中的变量类型传递方式，分为基本数据类型和引用数据类型。
其中基本数据类型包括Undefined、Null、Boolean、Number、String、Symbol、BigInt (后两个ES6新增)，而引用数据类型统称为Object对象，主要包括对象、数组和函数。
在参数传递方式上，有所不同：
- 函数的参数如果是简单类型，会将一个值类型的数值副本传到函数内部，函数内部不影响函数外部传递的参数变量
- 如果是一个参数是引用类型，会将引用类型的地址值复制给传入函数的参数，函数内部修改会影响传递参数的引用对象。

> 题目：基本类型和引用类型的区别
> 
基本类型和引用类型存储于内存的位置不同，基本类型直接存储在栈中,而引用类型的对象存储在堆中，与此同时，在栈中存储了指针，而这个指针指向正是堆中实体的起始位置。下面通过一个小题目，来看下两者的主要区别：
```js
var a = 10
var b = a
b = 20
console.log(a) // 10
console.log(b) // 20
```

上述代码中，a b都是值类型，两者分别修改赋值，相互之间没有任何影响。再看引用类型的例子：
```js
// 引用类型
var a = {x: 10, y: 20}
var b = a
b.x = 100
b.y = 200
console.log(a)  // {x: 100, y: 200}
console.log(b)  // {x: 100, y: 200}
```

上述代码中，a b都是引用类型。在执行了b = a之后，修改b的属性值，a的也跟着变化。因为a和b都是引用类型，指向了同一个内存地址，即两者引用的是同一个值，因此b修改属性时，a的值随之改动

### 2.数据类型的判断

1. typeof
typeof返回一个表示数据类型的字符串，返回结果包括：number、boolean、string、symbol、object、undefined、function等7种数据类型，但不能判断null、array等

```js
typeof Symbol(); // symbol 有效
typeof ''; // string 有效
typeof 1; // number 有效
typeof true; //boolean 有效
typeof undefined; //undefined 有效
typeof new Function(); // function 有效
typeof null; //object 无效
typeof [] ; //object 无效
typeof new Date(); //object 无效
typeof new RegExp(); //object 无效
```

2. instanceof
instanceof 是用来判断A是否为B的实例，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。**instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性，但它不能检测null 和 undefined**

```js
[] instanceof Array; //true
{} instanceof Object;//true
new Date() instanceof Date;//true
new RegExp() instanceof RegExp//true
null instanceof Null//报错
undefined instanceof undefined//报错
```

3. constructor
constructor作用和instanceof非常相似。但constructor检测 Object与instanceof不一样，还可以处理基本数据类型的检测。
不过函数的 constructor 是不稳定的，这个主要体现在把类的原型进行重写，在重写的过程中很有可能出现把之前的constructor给覆盖了，这样检测出来的结果就是不准确的。同样不能监测undefined和null。

```js
'1'.constructor === String // true
new Number(1).constructor === Number // true
true.constructor === Boolean // true
alert.constructor === Function // true
[].constructor === Array // true
new Date().constructor === Date // true
```

4. Object.prototype.toString.call()
**Object.prototype.toString.call() 是最准确最常用的方式。**

```js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
```

### 3.浅拷贝与深拷贝

**浅拷贝是指创建一个对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，那么拷贝的就是基本类型的值，如果属性是引用类型，那么拷贝的就是内存地址，所以如果其中一个对象修改了某些属性，那么另一个对象就会受到影响。**

#### 浅拷贝的实现方式：

- Object.assign()
Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

```js
let obj1 = { person: {name: "kobe", age: 41},sports:'basketball' }
let obj2 = Object.assign({}, obj1)
obj2.person.name = "wade"
obj2.sports = 'football'
console.log(obj1) // { person: { name: 'wade', age: 41 }, sports: 'basketball' }
```

<!-- more -->

- 展开运算符...

```js
let obj1 = { name: 'Kobe', address:{x:100,y:100}}
let obj2= {... obj1}
obj1.address.x = 200
obj1.name = 'wade'
console.log('obj2',obj2) // obj2 { name: 'Kobe', address: { x: 200, y: 100 } }
```

- Array.prototype.concat()

```js
let arr = [1, 3, {
    username: 'kobe'
    }]
let arr2 = arr.concat() 
arr2[2].username = 'wade'
console.log(arr) // [ 1, 3, { username: 'wade' } ]
```

- Array.prototype.slice()

```js
let arr = [1, 3, {
    username: ' kobe'
    }]
let arr3 = arr.slice()
arr3[2].username = 'wade'
console.log(arr) // [ 1, 3, { username: 'wade' } ]
```

#### 深拷贝的实现方式

- JSON.parse(JSON.stringify())
这也是利用JSON.stringify将对象转成JSON字符串，再用JSON.parse把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。**这种方法虽然可以实现数组或对象深拷贝,但不能处理函数和正则，因为这两者基于JSON.stringify和JSON.parse处理后，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为null）了。**

```js
let arr = [1, 3, {
    username: ' kobe'
}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)
```

- 手写递归方法
递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝。
**有种特殊情况需注意就是对象存在循环引用的情况，即对象的属性直接的引用了自身的情况，解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。**

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);
```
