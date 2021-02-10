---
title: "JavaScript核心考点（基础版）03：异步"
date: 2021-02-10 20:39:12
tags:
  - 面试
  - 异步
---

<!--banner-pic|sticker|content-img|content-img-half-->
<img class="banner-pic" src="http://oss.slybootslion.com/blog/v2-338d347877ab93d2ce82050e00cd7a02_r.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 同步 vs 异步
同步，我的理解是一种线性执行的方式，执行的流程不能跨越。比如说话后在吃饭，吃完饭后再看手机，必须等待上一件事完了，才执行后面的事情。

异步，是一种并行处理的方式，不必等待一个程序执行完，可以执行其它的任务。比方说一个人边吃饭，边看手机，边说话，就是异步处理的方式。在程序中异步处理的结果通常使用回调函数来处理结果。

```js
// 同步
console.log(100)
alert(200);
console.log(300)  //100 200 300
// 异步
console.log(100) 
setTimeout(function(){ 
  console.log(200) 
}) 
console.log(300) //100 300 200 
```

### 异步和单线程

JS需要异步的根本原因是JS是单线程运行的，即在同一时间只能做一件事，不能“一心二用”。为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

一个 Ajax 请求由于网络比较慢，请求需要 5 秒钟。如果是同步，这 5 秒钟页面就卡死在这里啥也干不了了。异步的话，就好很多了，5 秒等待就等待了，其他事情不耽误做，至于那 5 秒钟等待是网速太慢，不是因为 JS 的原因。

### 前端异步的场景

前端使用异步的场景

- 定时任务：setTimeout，setInterval
- 网络请求：ajax请求，动态加载
- 事件绑定

<!-- more -->

### Event Loop

一个完整的 Event Loop 过程，可以概括为以下阶段：

<img class="content-img" src="https://camo.githubusercontent.com/a5cef8d8c9dd57ca6685ddbffc253e153aa9c2ec9c8db888c8009f786ffe8ba2/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31302f313638333836333633333538363937343f773d33393426683d34343926663d706e6726733d3838343433"/>

- 一开始执行栈空,我们可以把**执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。
- 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。
- 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：**当 macro-task 出队时，任务是一个一个执行的；而 micro-task 出队时，任务是一队一队执行的。** 因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。
- **执行渲染操作，更新界面。**
- 检查是否存在 Web worker 任务，如果有，则对其进行处理。
- 上述过程循环往复，直到两个队列都清空。

接下来我们看道例子来介绍上面流程：
```js
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)
```

最后输出结果是Promise1，setTimeout1，Promise2，setTimeout2

- 一开始执行栈的同步任务（这属于宏任务）执行完毕，会去查看是否有微任务队列，上题中存在(有且只有一个)，然后执行微任务队列中的所有任务输出Promise1，同时会生成一个宏任务 setTimeout2。
- 然后去查看宏任务队列，宏任务 setTimeout1 在 setTimeout2 之前，先执行宏任务 setTimeout1，输出 setTimeout1。
- 在执行宏任务setTimeout1时会生成微任务Promise2 ，放入微任务队列中，接着先去清空微任务队列中的所有任务，输出 Promise2。
- 清空完微任务队列中的所有任务后，就又会去宏任务队列取一个，这回执行的是 setTimeout2。
