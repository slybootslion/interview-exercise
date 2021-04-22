---
title: "JavaScript基础：this基础练习"
date: 2021-04-22 17:52:48
tags:
  - 面试
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img alt="" class="banner-pic" src="https://slybootslion-blog.oss-cn-chengdu.aliyuncs.com/blog-head/2021-04-20/5bd0e16f76d9d9ef823c0be4e2400512.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 第一题

```js
var num = 10;
var obj = {
  num: 20
};
obj.fn = (function (num) {
  this.num = num * 3; // window.num = 20 * 3 = 60
  num++; // 21
  return function (n) { // obj.fn = function (n) {}
    this.num += n; // window.num = 60 + 5 = 65 --- obj.num = 20 + 10 = 30
    num++; // 22 --- 23
    console.log(num);
  }
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num);
// 22
// 23
// 65 30
```

不难理解，有点绕，要细心

#### 第二题

```js
let obj = {
  fn: (function () {
    return function () {
      console.log(this);
    }
  })()
};
obj.fn();
let fn = obj.fn;
fn();

// obj
// window
```

需要注意，虽然自运行中的函数里的this指向全局对象（window），但是自运行函数中返回的函数，还是看调用方。

### 第三题

```js
var fullName = 'language';
var obj = {
  fullName: 'javascript',
  prop: {
    getFullName: function () {
      return this.fullName;
    }
  }
};
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test());

// undefined
// language
```

第二个this指向全局window没毛病。
第一个this指向的是prop，prop下面没有fullName所以，打印undefined。

<!-- more -->

### 第四题

```js
var name = 'window';
var Tom = {
  name: "Tom",
  show: function () {
    console.log(this.name);
  },
  wait: function () {
    var fun = this.show;
    fun();
  }
};
Tom.wait();
// window
```

解题步骤：
- window.name = 'window'
- Tom.wait()调用，this.show ---> Tom.show 并赋值给 fun
- fun()调用，fun前面没有点，fun的this指向了全局，就是window，函数内的this指向window，window下的name是'window'
- 所以打印'window'

### 第五题

```js
window.val = 1;
var json = {
  val: 10,
  dbl: function () {
    this.val *= 2;
  }
}
json.dbl(); // json.val = 10 * 2 = 20
var dbl = json.dbl;
dbl(); // window.val = 1 * 2 = 2
json.dbl.call(window); // window.val = 2 * 2 = 4
alert(window.val + json.val); // 20 + 4 = '24'
```

弹出字符串24

### 第六题

```js
(function () {
  var val = 1;
  var json = {
    val: 10,
    dbl: function () {
      val *= 2;
    }
  };
  json.dbl(); // val = 1 * 2 = 2
  alert(json.val + val); // 10 + 2 = '12'
})();
```

弹出字符串12
