---
title: "JavaScript基础：数据类型基础练习"
date: 2021-04-22 14:53:16
tags:
  - 面试
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-20/d02d964c77be84572fce9902ab7315be.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 第一题

```js
let result = 100 + true + 21.2 + null + undefined + "XXX" + [] + null + 9 + false;
console.log(result);

// NaNXXXnull9false
```

不说了，之前做过的，腾讯真题。


### 第二题

```js
{}+0?alert('ok'):alert('no');
0+{}?alert('ok'):alert('no');
```

第一个no，第二个ok。简单说一下，第一个的{}会被当成代码块，不参与运算，第二个参与运算，会被转成字符串，所以是0[object Object]。

### 第三题

```js
let res = Number('12px');
if(res===12){
    alert(200);
}else if(res===NaN){
    alert(NaN);
}else if(typeof res==='number'){
    alert('number');
}else{
    alert('Invalid Number');
}
```

陷阱题，如果疏忽了会做错。res肯定是NaN这没毛病，但是NaN与任何值都不相等，包括NaN，但是NaN本身是个数字类型，所以弹出'number'

### 第四题

```js
let arr = [27.2,0,'0013','14px',123];
arr = arr.map(parseInt);
console.log(arr);
```

这个之前也做过了，知识点：
parseInt有两个参数，第二个参数代表进制。第二个参数不传或者传0都是10进制，第二个参数的范围是2-36否则返回NaN，任意进制转10进制的方法：
1 * 4^2 + 2 * 4^ 1 + 3 * 4 ^ 0 = 16 + 8 + 3 = 27

所有答案是：
[27, NaN, 1, 1, 27]

延展知识：
以0开始的数字，浏览器解析阶段，会把其当作八进制，然后转为十进制。以0x开头的，会把其当作16进制。
