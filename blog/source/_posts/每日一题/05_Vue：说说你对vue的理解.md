---
title: "每日一题：说说你对vue的理解"
date: 2021-02-11 11:50:38
tags:
  - 面试
  - Vue
  - 每日一题
---

<!--banner-pic|sticker|content-img|content-img-half-->

<img class="banner-pic" src="http://oss.slybootslion.com/blog/1_wFL3csJ96lQpY0IVT9SE3w.jpeg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>


>《每日一题》就是从网上找来的题，内容可能会有其他总结重复，这不重要，因为复习总结很多资料都是重复的东西，重复也是加强理解和记忆的方式。
> 另外，有些问题，虽然看似可能会很简单，但是怎么答的巧妙显得有内容，是这些文章所要做到的。

### Vue核心特点

三、Vue核心特性

#### 数据驱动（MVVM)

MVVM表示的是 Model-View-ViewModel
- Model：模型层，负责处理业务逻辑以及和服务器端进行交互
- View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
- ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁

这时候需要一张直观的关系图，如下
<img class="banner-pic" src="http://oss.slybootslion.com/blog/说说你对vue的理解1.webp?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>


#### 组件化

1. 什么是组件化
一句话来说就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在Vue中每一个.vue文件都可以视为一个组件

2. 组件化的优势
降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

#### 指令系统
解释：指令 (Directives) 是带有 v- 前缀的特殊属性
作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

常用的指令：
- 条件渲染指令 v-if
- 列表渲染指令v-for
- 属性绑定指令v-bind
- 事件绑定指令v-on
- 双向数据绑定指令v-model

<!-- more -->

### Vue跟传统开发的区别

没有落地使用场景的革命不是好革命，就以一个高频的应用场景来示意吧
注册账号这个需求大家应该很熟悉了，如下:

<img class="banner-pic" src="http://oss.slybootslion.com/blog/说说你对vue的理解2.webp?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

用jquery来实现大概的思路就是选择流程dom对象，点击按钮隐藏当前活动流程dom对象，显示下一流程dom对象
<img class="banner-pic" src="http://oss.slybootslion.com/blog/说说你对vue的理解3.webp?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

用vue来实现，我们知道vue基本不操作dom节点， 双向绑定使dom节点跟视图绑定后，通过修改变量的值控制dom节点的各类属性。

所以其实现思路为：视图层使用一变量控制dom节点显示与否，点击按钮则改变该变量，如下图
<img class="banner-pic" src="http://oss.slybootslion.com/blog/说说你对vue的理解4.webp?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

总结就是：
Vue所有的界面事件，都是只去操作数据的，Jquery操作DOM
Vue所有界面的变动，都是根据数据自动绑定出来的，Jquery操作DOM

### Vue和React对比
这里就做几个简单的类比吧，当然没有好坏之分，只是使用场景不同

##### 相同点
- 都有组件化思想
- 都支持服务器端渲染
- 都有Virtual DOM（虚拟dom）
- 数据驱动视图
- 都有支持native的方案：Vue的weex、React的React native
- 都有自己的构建工具：Vue的vue-cli、React的Create React App

#### 区别
- 数据流向的不同。react从诞生开始就推崇单向数据流，而Vue是双向数据流
- 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据
- 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
- diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM
