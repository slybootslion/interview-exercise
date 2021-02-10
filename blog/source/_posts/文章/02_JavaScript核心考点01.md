---
title: "JavaScript核心考点（基础版）02：作用域和闭包"
date: 2021-02-10 20:01:28
tags:
  - 面试
  - 作用域
---

<!--banner-pic|sticker|content-img|content-img-half-->
<img class="banner-pic" src="http://oss.slybootslion.com/blog/v2-908b0b60e6a9b2df42ec9100fa9bae49_r.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 执行上下文和执行栈

执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行。执行上下文的生命周期包括三个阶段：创建阶段→执行阶段→回收阶段，我们重点介绍创建阶段。

创建阶段（当函数被调用，但未执行任何其内部代码之前）会做以下三件事：
- 创建变量对象：首先初始化函数的参数arguments，提升函数声明和变量声明。
- 创建作用域链：下文会介绍
- 确定this指向：下文会介绍

```js
// 1. 形参 arg 是 "hi"
function test(arg){
    // 2. 因为函数声明比变量声明优先级高，所以此时 arg 是 function
    console.log(arg);  
    var arg = 'hello'; // 3.var arg 变量声明被忽略， arg = 'hello'被执行
    function arg(){
	    console.log('hello world') 
    }
    console.log(arg);  
}
test('hi');

/* 输出：
function arg() {
    console.log('hello world');
}
hello 
*/
```

这是因为当函数执行的时候,首先会形成一个新的私有的作用域，然后依次按照如下的步骤执行：
1. 如果有形参，先给形参赋值
2. 进行私有作用域中的预解释，函数声明优先级比变量声明高，最后后者会被前者所覆盖，但是可以重新赋值
3. 私有作用域中的代码从上到下执行

函数多了，就有多个函数执行上下文，每次调用函数创建一个新的执行上下文，那如何管理创建的那么多执行上下文呢？

JavaScript 引擎创建了执行栈来管理执行上下文。**可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。**

<img class="content-img" src="https://camo.githubusercontent.com/0b4c98138f8e75f41b54293c81b1796e858847ca9748e90596286cec76e4416f/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f31372f313639386163326338636131303738343f773d34383626683d32333826663d67696626733d313138303833"/>

从上面的流程图，我们需要记住几个关键点：
- JavaScript执行在单线程上，所有的代码都是排队执行。
- 一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
- 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
- 浏览器的JS执行引擎总是访问栈顶的执行上下文。
- 全局上下文只有唯一的一个，它在浏览器关闭时出栈。

### 作用域与作用域链

ES6 到来JavaScript 有全局作用域、函数作用域和块级作用域（ES6新增）。我们可以这样理解：**作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。**
在介绍作用域链之前，先要了解下自由变量，如下代码中，console.log(a)要得到a变量，但是在当前的作用域中没有定义a（可对比一下b）。当前作用域没有定义的变量，这称为自由变量。
```js
var a = 100
function fn() {
    var b = 200
    console.log(a) // 这里的a在这里就是一个自由变量
    console.log(b)
}
fn()
```
**自由变量的值如何得到 —— 向父级作用域(创建该函数的那个父级作用域)寻找。**如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是作用域链 。
```js
function F1() {
    var a = 100
    return function () {
        console.log(a)
    }
}
function F2(f1) {
    var a = 200
    console.log(f1())
}
var f1 = F1()
F2(f1) // 100
``` 
上述代码中，自由变量a的值，从函数F1中查找而不是F2,这是因为**当自由变量从作用域链中去寻找，依据的是函数定义时的作用域链，而不是函数执行时。**

<!-- more -->

### 闭包是什么

闭包这个概念也是JavaScript中比较抽象的概念，我个人理解，**闭包是就是函数中的函数(其他语言不能这样),里面的函数可以访问外面函数的变量，外面的变量的是这个内部函数的一部分。**

闭包的作用：
- 使用闭包可以访问函数中的变量。
- 可以使变量长期保存在内存中，生命周期比较长。

闭包不能滥用，否则会导致内存泄露，影响网页的性能。闭包使用完了后，要立即释放资源，将引用变量指向null。

闭包主要有两个应用场景：
- 函数作为参数传递（见作用域部分例子）
- 函数作为返回值（如下例）

```js
function outer() {
  var num = 0 //内部变量
  return function add() {
    //通过return返回add函数，就可以在outer函数外访问了。
    num++ //内部函数有引用，作为add函数的一部分了
    console.log(num)
  }
}
var func1 = outer() //
func1() //实际上是调用add函数， 输出1
func1() //输出2
var func2 = outer()
func2() // 输出1
func2() // 输出2
```

### this全面解析
先搞明白一个很重要的概念 —— **this的值是在执行的时候才能确认，定义的时候不能确认！** 为什么呢 —— 因为this是执行上下文环境的一部分，而执行上下文需要在代码执行之前确定，而不是定义的时候。看如下例子：

```js
// 情况1
function foo() {
  console.log(this.a) //1
}
var a = 1
foo()

// 情况2
function fn(){
  console.log(this);
}
var obj={fn:fn};
obj.fn(); //this->obj

// 情况3
function CreateJsPerson(name,age){
//this是当前类的一个实例p1
this.name=name; //=>p1.name=name
this.age=age; //=>p1.age=age
}
var p1=new CreateJsPerson("尹华芝",48);

// 情况4
function add(c, d){
  return this.a + this.b + c + d;
}
var o = {a:1, b:3};
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

// 情况5
<button id="btn1">箭头函数this</button>
<script type="text/javascript">   
    let btn1 = document.getElementById('btn1');
    let obj = {
        name: 'kobe',
        age: 39,
        getName: function () {
            btn1.onclick = () => {
                console.log(this);//obj
            };
        }
    };
    obj.getName();
</script>
```
> my tips
> this永远指向被调用者，直接调用就是window调用就指向window；obj调用就是obj；实例调用就是实例；call、bind、apply就是被绑定的对象的调用；dom元素绑定的函数就指向dom本身；箭头函数没有自己的this，所以是外面的一般函数的this；
> 综上所述：this永远指向被调用者。

接下来我们逐一解释上面几种情况
- 对于直接调用foo来说，不管foo函数被放在了什么地方，this一定是window。
- 对于obj.foo()来说，我们只需要记住，谁调用了函数，谁就是this，所以在这个场景下foo函数中的this就是obj对象
- 在构造函数模式中，类中(函数体中)出现的this.xxx=xxx中的this是当前类的一个实例
- call、apply和bind：this 是第一个参数
- 箭头函数this指向:箭头函数没有自己的this，看其外层的是否有函数，如果有，外层函数的this就是内部箭头函数的this，如果没有，则this是window。

<img class="content-img" src="https://camo.githubusercontent.com/8d6aa78783d270896130dee6e8d2d27fa4100034dbc88e534795177430d97a3e/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f352f313639346537353632366337343664313f773d36303226683d34323626663d706e6726733d3535383437"/>

