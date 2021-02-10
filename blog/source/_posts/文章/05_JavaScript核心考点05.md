---
title: "JavaScript核心考点（基础版）05：DOM操作与BOM操作"
date: 2021-02-10 21:08:04
tags:
  - 面试
  - 浏览器操作
---

<!--banner-pic|sticker|content-img|content-img-half-->
<img class="banner-pic" src="http://oss.slybootslion.com/blog/v2-11c43c4e4bf60f7312bdaec21b30e198_r.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### DOM操作

当网页被加载时，浏览器会创建页面的文档对象模型(DOM),我们可以认为 DOM 就是 JS 能识别的 HTML 结构，一个普通的 JS 对象或者数组。接下来我们介绍常见DOM操作：

新增节点和移动节点

```js
var div1 = document.getElementById('div1')
// 添加新节点
var p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) // 添加新创建的元素
// 移动已有节点。注意，这里是“移动”，并不是拷贝
var p2 = document.getElementById('p2')
div1.appendChild(p2)
```

获取父元素
```js
var div1 = document.getElementById('div1')
var parent = div1.parentElement
```

获取子元素
```js
var div1 = document.getElementById('div1')
var child = div1.childNodes
```

删除节点
```js
var div1 = document.getElementById('div1')
var child = div1.childNodes
div1.removeChild(child[0])
```

### DOM事件模型和事件流

DOM事件模型分为捕获和冒泡。一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。
1. 捕获阶段：事件从window对象自上而下向目标节点传播的阶段；
2. 目标阶段：真正的目标节点正在处理事件的阶段；
3. 冒泡阶段：事件从目标节点自下而上向window对象传播的阶段。

DOM事件捕获的具体流程

<img class="content-img" src="https://camo.githubusercontent.com/16c504438355ac7ab0c4f4bc7ec9e0abdde20949ba8d6a5082396d1316418079/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31312f392f313636663831663365306432643163613f773d34363126683d32343326663d706e6726733d3332363530"/>

捕获是从上到下，事件先从window对象，然后再到document（对象），然后是html标签（通过document.documentElement获取html标签），然后是body标签（通过document.body获取body标签），然后按照普通的html结构一层一层往下传，最后到达目标元素。

接下来我们看个事件冒泡的例子：

```js
// 事件冒泡
<div id="outer">
  outer
  <div id="inner">inner</div>
</div>

window.onclick = function() {
  console.log('window');
}
document.onclick = function() {
  console.log('document');
}
document.documentElement.onclick = function() {
  console.log('html');
}
document.body.onclick = function() {
  console.log('body');
}
outer.onclick = function(ev) {
  console.log('outer');
}
inner.onclick = function(ev) {
  console.log('inner');
}
```

<img class="content-img" src="https://camo.githubusercontent.com/2a9550ffa76ca2ead5911857da62e2562a55833dd0ffd9d5549e1025e79e7bb2/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31322f312f313637363764666338343937346434313f773d35363826683d31313626663d706e6726733d33393936"/>

如何阻止冒泡？

通过event.stopPropagation() 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。
我们可以在上例中inner元素的click事件上，添加event.stopPropagation()这句话后，就阻止了父事件的执行，最后只打印了'inner'。
```js
inner.onclick = function(ev) {
  console.log('inner')
  ev.stopPropagation()
}
```

<!-- more -->

### 事件代理(事件委托)

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理。
我们设定一种场景，如下代码，一个<div>中包含了若干个<a>，而且还能继续增加。那如何快捷方便地为所有<a>绑定事件呢？

```js
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>
```

如果给每个<a>标签一一都绑定一个事件，那对于内存消耗是非常大的。借助事件代理，我们只需要给父容器div绑定方法即可，这样不管点击的是哪一个后代元素，都会根据冒泡传播的传递机制，把父容器的click行为触发，然后把对应的方法执行，根据事件源，我们可以知道点击的是谁，从而完成不同的事。

```js
var div1 = document.getElementById('div1')
div1.addEventListener('click', function (e) {
    // e.target 可以监听到触发点击事件的元素是哪一个
    var target = e.target
    if (e.nodeName === 'A') {
        // 点击的是 <a> 元素
        alert(target.innerHTML)
    }
})
```
最后，使用代理的优点如下：
- 使代码简洁
- 减少浏览器的内存占用

### BOM 操作
BOM（浏览器对象模型）是浏览器本身的一些信息的设置和获取，例如获取浏览器的宽度、高度，设置让浏览器跳转到哪个地址。
- window.screen对象：包含有关用户屏幕的信息
- window.location对象：用于获得当前页面的地址(URL)，并把浏览器重定向到新的页面
- window.history对象：浏览历史的前进后退等
- window.navigator对象：常常用来获取浏览器信息、是否移动端访问等等

获取屏幕的宽度和高度
```js
console.log(screen.width)
console.log(screen.height)
```

获取网址、协议、path、参数、hash 等
```js
// 例如当前网址是 https://juejin.im/timeline/frontend?a=10&b=10#some
console.log(location.href)  // https://juejin.im/timeline/frontend?a=10&b=10#some
console.log(location.protocol) // https:
console.log(location.pathname) // /timeline/frontend
console.log(location.search) // ?a=10&b=10
console.log(location.hash) // #some
```

另外，还有调用浏览器的前进、后退功能等
```js
history.back()
history.forward()
```

获取浏览器特性（即俗称的UA）然后识别客户端，例如判断是不是 Chrome 浏览器
```js
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

### Ajax与跨域
Ajax 是一种异步请求数据的一种技术，对于改善用户的体验和程序的性能很有帮助。
简单地说，在不需要重新刷新页面的情况下，Ajax 通过异步请求加载后台数据，并在网页上呈现出来。常见运用场景有表单验证是否登入成功、百度搜索下拉框提示和快递单号查询等等。Ajax的目的是提高用户体验，较少网络数据的传输量。

> tips: 手写系列，需要掌握（虽然没什么用）

如何手写 XMLHttpRequest 不借助任何库
```js
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    // 这里的函数异步执行
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            alert(xhr.responseText)
        }
    }
}
xhr.open("GET", "/api", false)
xhr.send(null)
```

因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。
那么是出于什么安全考虑才会引入这种机制呢？ 其实主要是用来防止 CSRF 攻击的。简单点说，CSRF 攻击是利用用户的登录态发起恶意请求。
然后我们来考虑一个问题，请求跨域了，那么请求到底发出去没有？ 请求必然是发出去了，但是浏览器拦截了响应。

> tips: 口答面试题掌握

常见的几种跨域解决方案：
- JSONP：利用同源策略对`<script>`标签不受限制,不过只支持GET请求
- CORS：实现 CORS 通信的关键是后端，服务端设置 Access-Control-Allow-Origin 就可以开启，备受推崇的跨域解决方案，比 JSONP 简单许多
- Node中间件代理或nginx反向代理：主要是通过同源策略对服务器不加限制

### 存储
sessionStorage 、localStorage 和 cookie 之间的区别
- 共同点：都是保存在浏览器端，且都遵循同源策略。
- 不同点：在于生命周期与作用域的不同

作用域：localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下

<img class="content-img" src="https://camo.githubusercontent.com/8beca2857267edd3677e0a43722202c76c464d1519974b2ddccf14b56db5e827/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f32312f313639613037633437386238353763353f773d34353626683d32373026663d706e6726733d3535363838"/>

生命周期：localStorage 是持久化的本地存储，存储在其中的数据是永远不会过期的，使其消失的唯一办法是手动删除；而 sessionStorage 是临时性的本地存储，它是会话级别的存储，当会话结束（页面被关闭）时，存储内容也随之被释放。

三者区别:

<img class="content-img" src="https://camo.githubusercontent.com/c76b93cef881f49bad52c0ac0c47714bc5aecc029a17babd69a47dcb4fe3de42/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f31392f313633373630326262613037653961633f773d3132343026683d34323126663d706e6726733d313538393330"/>
