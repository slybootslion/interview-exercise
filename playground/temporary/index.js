let Img = document.getElementsByTagName("img"),
  len = Img.length,
  count = 0;

function lazyLoad () {
  let viewH = document.body.clientHeight, //可见区域高度
    scrollTop = document.body.scrollTop; //滚动条距离顶部高度
  for (let i = count; i < len; i++) {
    if (Img[i].getBoundingClientRect().top < scrollTop + viewH) {
      if (Img[i].getAttribute('src') === 'default.png') {
        Img[i].src = Img[i].getAttribute('data-src')
        count++;
      }
    }
  }
}

function throttle (fn, delay) {
  let flag = true,
    timer = null;
  return function (...args) {
    let context = this;
    if (!flag) return;
    flag = false;
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, delay);
  };
};
window.addEventListener('scroll', throttle(lazyLoad, 1000))
lazyLoad();
