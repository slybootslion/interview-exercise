---
title: "JavaScript基础：闭包与作用域练习"
date: 2021-04-20 10:06:46
tags:
  - 面试
  - 知识点
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-16/868b072788159c5abdca7d4220c13334.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

> 散落在各处，好像有体系，但是又没有体系的知识点或者题，收录在这些个散落的日志中。

#### 第一题

```js
let x = 5;
function fn(x) {
    return function(y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7); // 14
fn(8)(9); // 18
f(10); // 18
console.log(x); // 5
```

拓展知识点 ++i 和 i++ 的区别：
- 相同点：都是自身基础上累加1
- 不同点：计算和累加的顺序
  - ++i 自身先累加1，根据累加后的结果进行运算
  - i++ 先根据原始的值进行运算，运算完成后再累加1

```js
let i = 1;
console.log(5 + i++); // 5+(i++) 都是一样的效果 -> 5+i=6  i++:i=2
console.log(i);

i = 1;
console.log(5 + (++i)); // -> ++i:i=2  5+i=7
console.log(i);
```

处理字符串时的方式：

```js
let i = '1';
i++;
console.log(i); //->2  i++和++i一定是数学运算「“+N”也是把N变为数字类型的值」

i = '1';
i += 1; //i=i+1
console.log(i); //->'11' 
```

`++i`和`i++`的拓展题：

```js
  let i = 2;
  console.log(2 + (++i) - (i++) + 3 - (i--) + (--i)); // 2 + 3 - 4 + 3 - 3 + 2 = 3
  console.log(i); // 2
```

题解：
<img alt="" class="content-img" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-20/0408022a13a12c45c7169e9a7e2447ff.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

#### 第二题

```js
  let a = 0, b = 0
  function A(a) {
    A = function (b) {
      console.log(a + b++)
    }
    console.log(a++)
  }
  A(1) // 1
  A(2) // 2 + 2 = 4
```

题解：
<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog/2021-04-20/f586b20bbabfa74f2ce87cd6b20c799e.png?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>



