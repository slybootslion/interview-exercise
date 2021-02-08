var a = 10
var obj = {
  a: 20,
  say: function () {
    console.log(this.a);
  }
};
obj.say() // 20

// 怎么打印出10？ 箭头函数，call

