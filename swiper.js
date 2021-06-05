
var style = document.createElement('style');
style.innerHTML = `
* {
    padding: 0;
    margin: 0;
}

.swiper {
    position: relative;
    margin: 100px auto;
    width: 700px;
	height: 300px;
}

.swiper .imgList {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.swiper .imgList .imgitem {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
}

.swiper .imgList .imgitem.active {
    opacity: 1;
}


.swiper .btn .prevBtn {
    position: absolute;
    left: 0;
    top: calc(50% - 25px);
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 25px;
    color: #333;
}

.swiper .btn .nextBtn {
    position: absolute;
    right: 0;
    top: calc(50% - 25px);
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 25px;
    color: #333;
}

.swiper .btn .prevBtn:hover,
.swiper .btn .nextBtn:hover {
    background-color: rgba(0,0,0,0.2);
    cursor: pointer;
}


.circleList {
    position: absolute;
    right: 20px;
    bottom: 10px;
    width: 400px;
    height: 21px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.circleList .circle {
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    background: rgba(0,0,0,.4);
    border: 3px solid #666;
    border-radius: 50%;
    margin: 0 5px;
}

.circleList .circle:hover,
.circleList .circle.active {
    border: 3px solid #999;
    background: rgba(255,255,255,.4);
    cursor: pointer;
}
`

document.head.appendChild(style);
// document.body.appendChild(style);

// options是接收过来的对象，如el和imgs
function Swiper(options){
    // swiper就是获取到的元素
    var swiper = document.querySelector(options['el']);


    // 设置宽高
    swiper.style.width = options['width'] + 'px';
    swiper.style.height = options['height'] + 'px';
    
    // 创建图片列表父元素
    var imgList = document.createElement('div');
    imgList.classList.add('imgList');

    // 创建小圆点父元素
    var circleList = document.createElement('div');
    circleList.classList.add('circleList');

    // 初始值
    var index = 0;
    // 根据图片内容来生成对应的图片列表数量和小圆点数量
    options.imgs.forEach(function(item,i){
        // 创建图片列表
        var imgItem = document.createElement('div');
        imgItem.className = i==index?'imgitem active': 'imgitem';
        imgItem.style.backgroundImage = 'url('+item+')';

        // 创建小圆点
        var circle = document.createElement('div');
        circle.className = i==index?'circle active': 'circle';
        // 小圆点增加data-id
        circle.setAttribute('data-id',i);

        // 将图片和小圆点分别加到图片列表和小圆点列表中
        imgList.appendChild(imgItem);
        circleList.appendChild(circle);
    })

    // 创建上一张和下一张的父元素
    var btn = document.createElement('div');
    btn.classList.add('btn');
    
    // 创建上一张
    var prevBtn = document.createElement('div');
    prevBtn.classList.add('prevBtn');
    prevBtn.innerHTML = '<';

    // 创建下一张
    var nextBtn = document.createElement('div');
    nextBtn.classList.add('nextBtn');
    nextBtn.innerHTML = '>';

    // 将上一张和下一张加入父元素
    btn.appendChild(prevBtn);
    btn.appendChild(nextBtn);

    // 将上面的父元素全部加入swiper中
    swiper.appendChild(imgList);
    swiper.appendChild(btn);
    swiper.appendChild(circleList);

    var imgs = document.querySelectorAll('.imgList .imgitem');
    var circles = document.querySelectorAll('.circleList .circle');
    
    // 监听按钮
    var isClick = true;
    // 下一张
    nextBtn.onclick = function(){
        if (isClick){
            isClick = false;
            var clickTimer = setTimeout(function(){
                isClick = true;
                // clearTimeout(clickTimer);
            }, 1500)
            circles[index].classList.remove('active');
            imgs[index].classList.remove('active');
            index++;
            index > 2? index = 0: index;
            circles[index].classList.add('active');
            imgs[index].classList.add('active');
        }
    }
    // 上一张
    prevBtn.onclick = function(){
        circles[index].classList.remove('active');
        imgs[index].classList.remove('active');
        index--;
        index < 0? index = 2: index;
        circles[index].classList.add('active');
        imgs[index].classList.add('active');
    }
    
    
    
    
    // 小圆点
    circleList.onclick = function(e){
        // 通过冒泡来完成事件委托，父元素设置了点击事件，那么下面的子元素都会触发
        // 此时需要的是父元素下面的小圆点，但是点击其他地方也会触发，所以要做一个判断
        if (e.target.className == 'circle') {
            // 判断是小圆点才能触发点击事件
            circles[index].classList.remove('active');
            imgs[index].classList.remove('active');
            // 同步index
            index = parseInt(e.target.dataset.id);
            imgs[index].classList.add('active');
            circles[index].classList.add('active');
        }
    }
    
    var timer = setInterval(function(){
        nextBtn.onclick();
    } , 2000)
    
    swiper.onmouseenter = function(){
        clearInterval(timer);
    }
    
    swiper.onmouseleave = function(){
        // clearInterval(timer);
        timer = setInterval(function(){
            nextBtn.onclick();
        } , 2000)
    }
}
