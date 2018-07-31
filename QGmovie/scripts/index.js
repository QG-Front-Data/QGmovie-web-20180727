/**
 * 首页的JS文件
 */

/**
 * 粘性顶部栏
 */

(function() {
    
})();
var header = document.getElementsByClassName('header')[0];

(function() {
    document.onscroll = function() {
    
        if (window.scrollY >= 300) { 
            addClass(header, 'sticky-header');
            console.log(window.scrollY);
        } else {
            removeClass(header, 'sticky-header');
        }
    }
})();


/**
 * 二级菜单
 */
var userHead = document.getElementsByClassName('user-head-container')[0];
    secondMenu = document.getElementsByClassName('second-menu')[0];
(function() {
    userHead.onmouseover = function() {
        addClass(header, 'active-header');
        secondMenu.onmouseleave = function() {
                removeClass(header, 'active-header');
        }
    };
    
})();

/**
 * 轮播图JS
 * @author czf
 * Date: 2018-07-30
 */

var slider = document.getElementsByClassName('slider')[0],
    control = document.getElementsByClassName('silder-control'),
    slide = document.getElementsByClassName('slide'),
    dotted = document.getElementsByClassName('dotted'),
    timer = setTimeout(autoPlay, 3000),
    index = 0; //索引

function activeAnimate() {
    clearTimeout(timer);
    showDotted();
    animate(index);
    timer = setTimeout(autoPlay, 4000);
}

/**
 * 点击小圆点切换
 */

(function clickDotted() {
    for (var i = 0; i < dotted.length; i++) {
        (function(i) {
            dotted[i].onclick = function () {
                index = i;
                activeAnimate();
            }
        })(i);
    }
})();

/**
 * 切换小圆点的样式
 */

function showDotted() {
    for (var i = 0; i < dotted.length; i++) {
        dotted[i].classList.remove('dotted-active');
    }
    dotted[index].classList.add('dotted-active');
}

/**
 * 切换动画
 * @param {*} index 
 */

function animate(index) {
    var left = {
        '0': '0%',
        '1': '-100%',
        '2': '-200%',
        '3': '-300%'
    }
    slider.style.transform = 'translateX(' + left[index] + ')';
    setTimeout(function () {
        for (var i = 0; i < slide.length; i++) {
            slide[i].classList.remove('slide-active');
        }
        slide[index].classList.add('slide-active');
    }, 500);
}

/**
 * 左右切换按钮
 */

control[1].onclick = function () {
    if (index == 3) {
        index = 0;
    } else {
        console.log(index);
        index++;
    }
    activeAnimate();
}
control[0].onclick = function () {
    if (index == 0) {
        index = 3;
    } else {
        console.log(index);
        index--;
    }
    activeAnimate();
}

/**
 * 自动播放
 */

function autoPlay() {
    if (index == 3) {
        index = 0;
    } else {
        console.log(index);
        index++;
    }
    activeAnimate();
}

