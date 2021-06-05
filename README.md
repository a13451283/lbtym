# 轮播图插件
## 使用方式
1. 引入swiper.js
```javascript
<script src="./swiper.js"></script>
```
2. 创建轮播，配置参数
```javascript
var lbSwiper = new Swiper({
	// 配置在哪个元素上生成轮播
    el: '.swiper',
    // 设置图片列表
    imgs: ['./img/2.jpeg','./img/3.webp','./img/4.webp'],
    // 设置宽高
    width: 1000,
    height: 500
})
```
