---
title: "JavaScript数据类型转换规则"
date: 2021-04-19 10:45:43
tags:
  - 面试
  - 知识点
---

<!--banner-pic|sticker|content-img|content-img-half-->

<!-- <img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-16/7b1e3ebf1ecb19b3884e8c5194f8540c.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/> -->

> 散落在各处，好像有体系，但是又没有体系的知识点或者题，收录在这些个散落的日志中。

#### 在==比较的过程中，数据转换的规则

**【类型一样的几个特殊点】**
1. {} == {}：false 对象比较的是堆内存的地址
2. [] == []: false
3. NaN == NaN false

**【类型不一样的转换规则】**
1. null == undefined: true，但是换成===结果是false (因为类型不一致)，剩下null/unfefined和其他任何数据类型值都不相等
2. 字符串 == 对象， 要把对象转换成字符串
3. 剩下如果==两边数据类型不一致，都是需要转换未数字再进行比较

#### 布尔值转换规则

把其他数据类型转换为布尔值的方式：
1. 基于以下方式可以把其他数据类型转换为布尔：
  - ! 转换为布尔值后取反
  - !! 转换为布尔类型
  - Boolean([val])
2. 隐式转换
  - 在循环或者条件判断中，条件处理的结果就是布尔类型值

规则：**只有“0、NaN、null、undefined、空字符串”五个值会变为false，其余都是true**

```js
console.log([] == false) //true
/* 
对象 == 布尔 都转换为数字（隐式转换）
对象转换为数字：先基于valueOf获得原始值，没有原始值再去toString，再转换为数字
[] -> '' -> 0
false -> 0
结果是true
*/
console.log(![] == false) // true
/* 
![] 数组转布尔类型取反 false
false == false => true
*/
```

#### 字符串类型转换

把其他类型转换为字符串，一般都是直接用`""`包起来。

```js
false.toString() // "false"
true.toString() // "true"
Symbol().toString() // "Symbol()"
String(undefined) // "undefined"
String(null) // "null"
String([1, 'a']) // "1,a"
```

只有普通对象调取toString是调取的Object.prototype.toString，不是转换为字符串，而是监测数据类型，返回结果"[object Object]"

```js
{name: 'xxx'}.toString() // "[object Object]"
```

<!-- more -->

#### 数字类型转换

Number()方法:

```js
console.log(Number('')) // 0
console.log(Number('10')) // 10
console.log(Number('10px')) // NaN 只要出现非有效数字字符结果都是NaN
console.log(Number(true)) // 1
console.log(Number(false)) // 0
console.log(Number(null)) // 0
console.log(Number(undefined)) // NaN
console.log(Number(Symbol(10))) // 报错
console.log(Number(BigInt(10))) // 报错
// 对象变为数字，先valueOf，没有原始值再toString变为字符串，最后把字符串转为数字
console.log(Number(new Date())) // 1618806123264
console.log(Number({name: 'xxx'})) // NaN
console.log(Number([1, 2])) // NaN
console.log(Number([1])) // 1
```

parseInt()方法：
从字符串左侧第一个字符开始，查找有效数字字符，遇到非有效数字字符停止查找，不论后面是否还有数字字符，都不再找了，把找到的有效数字转换为数字，如果一个都没有找到就是NaN。parseFloat比它多实别一个小数点。

```js
  console.log(parseInt('')) // NaN
  console.log(Number('')) // 0
  console.log(isNaN('')) // false
  console.log(parseInt(null)) // NaN
  console.log(Number(null)) // 0
  console.log(isNaN(null)) // false
  console.log(parseInt('12px')) // 12
  console.log(Number('12px')) // NaN
  console.log(isNaN('12px')) // true
  console.log(parseFloat('1.6px') + parseInt('1.2px') + typeof parseInt('null')) // "2.6number"
  console.log(isNaN(Number(!!Number(parseInt('0.8'))))) // false
  console.log(typeof !parseInt(null) + !isNaN(null)) // "booleantrue"
```

**面试题:**

第一题：

```js
  const result = 10 + false + undefined + [] + 'xxx' + null + true + {}
  console.log(result) // NaNxxxnulltrue[object Object]
```
10 + false 是 10
10 + undefined 是 NaN
NaN + [] 是 "NaN" 应该双方都变成数字运算，但是数组转数字前会变成字符串，还没转成数字前，先进行字符串拼接，变成字符串的NaN
NaN + 'xxx' 是 NaNxxx，之后都是字符串拼接，依此类推：NaNxxxnulltrue[object Object]

第二题：

```js
  let arr = [10.18, 0, 10, 5, 23]
  arr = arr.map(parseInt)
  console.log(arr) // [10, NaN, 2, 2, 11]
```

诡计题：
map回调中有三个参数，前两个会依次传入parseInt
parseInt有两个参数第一个是要转的值，第二是进制
所以，第一个是
parseInt(10.18, 0) 第二个不写或者写0，都按照10进制处理（如果第一个参数是0x开头，默认以16进制来计算） 这里结果是10。进制范围是2-36之间，否则都是NaN
parseInt(0, 1) 一进制没有 所以NaN
parseInt(10, 2) 10的二进制 转十进制是2
parseInt(25, 3) 从左侧查找有效进制内的数字，找到不符合的停止查找，将已找到的有效数字转为10进制并返回 5不是有效数字，返回2的3进制，转10进制，是2
parseInt(23, 4) 23的四进制 转十进制是11

任意进制转10进制的方法：
23的四进制，转十进制
`2*4^1 + 3*4^0 = 8 + 3 = 11`
23.12的四进制，转十进制：
`2*4^1 + 3*4^0 + 1*4^-1 + 2*4^-2 = 8 + 3 + 0.25 + 0.125 = 11.375`
