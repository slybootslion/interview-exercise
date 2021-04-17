---
title: "JavaScript基础：几个基础数据类型"
date: 2021-04-17 11:39:21
tags:
  - 知识点
  - 面试
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-16/231f98e013a1d0bf4703fb99b4cfe464.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

> 散落在各处，好像有体系，但是又没有体系的知识点或者题，收录在这些个散落的日志中。

### 数据类型

#### 1. 数字类型（number）

+ NaN:not a number 不是一个有效数字，但是属于number类型的
  + NaN和NaN本身不相等,和其它值也都不等
  + isNaN([value]):检测当前值是否不是效数字，不是有效数字返回true，反之是有效数字则返回false
  + Object.is(NaN, NaN):true  「is方法内部做了特殊的处理」
+ Infinity：无限大 -Infinity：无限小

--- 

把其它数据类型转换为number类型

 + 显式转换「 Number([value]) | parseInt/parseFloat([value]) 」
 + 隐式转换 -> Number
   + 数学运算
   + 基于==比较的时候
   + isNaN([value])
   + ...

```js
console.log(typeof NaN); //->'number'
console.log(typeof Infinity); //->'number'
console.log(NaN === NaN); //->false
console.log(Object.is(NaN, NaN)); //->true
```
#### 2. 字符串类型

直接上代码，字符串没什么好说的。

```js
let n = '10',
    m = 10;

console.log(10 + n); // “+”有一边出现了字符串「前提:有两边」会变为字符串拼接 ‘1010’
console.log(+n); // “+”只有一边，把值转换为数字  10
console.log(++n); // “++”和上面一样也是转换为数字，但是还会自身累加一   11 */
```

- 如果“+”两边，有一边是对象，则也可能会成为字符串拼接
  - 10+{} 或者 10+{name:'slybootslion'} -> '10[object Object]'
  + 10+[10] -> "1010"

- 特殊情况：
  + 10+new Number(10) -> 20
  + {}+10 或者 {name:'xxx'}+10 -> 10 「原因：{...}没有参与运算，浏览器认为其是一个代码块，计算‘+10’」
    + ({}+10) -> '[object Object]10'
    + let x={}+10 -> '[object Object]10' 这两种两种不论是包起来还是赋值，从语法分析上都要参与到计算中了

- 底层机制：对象在做数学运算的时候
   + 检测对象的 Symbol.toPrimitive 这个属性值，如果有则基于这个值进行运算，如果没有
   + 检测对象的 valueOf() 这个值「原始值:基本类型值」，如果有则基于这个值进行运算，如果不是原始值
   + 获取对象的 toString() 把其变为字符串  -> 如果是‘+’处理，则看到字符串了，所以变为字符串拼接
   + 如果最后就是想变为数字，则再把字符串转换为数字即可

```js
et obj = {
    [Symbol.toPrimitive]: function (hint) {
        // hint:记录浏览器识别出来的，你会把其转换为什么类型的 default/string/number ...
        // console.log(hint);
        return 10;
    }
};
console.log(10 + obj); //->20
console.log(10 + new Number(10)); //->20   new Number(10).valueOf() 
```

<!-- more -->


#### 3. Symbol():创建唯一值

- 作用：
  1. 给对象设置一个Symbol属性：唯一属性 「减少属性处理上的冲突」
  2. 宏观管理一些唯一的标识的时候，也是用唯一值

```js
let x = Symbol();
let obj = {
    [x]: 100
};
console.log(obj[x]); //->100

// 很多JS的内置原理都是基于这些Symbol的属性来处理的
Symbol.toPrimitive
Symbol.hasInstance
Symbol.toStringTag
Symbol.iterator
```

#### 4. BigInt:大数 

大型项目中，服务器返回给客户端的数据中可能出现大数「服务器数据库中可以基于longint存储数值,这个值可能会超过最大安全数字」
Number.MAX_SAFE_INTEGER : 9007199254740991 最大安全数字
Number.MIN_SAFE_INTEGER
超过安全数字进行运算，结果是不准确的
