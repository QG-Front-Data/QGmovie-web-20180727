
/**
 * 二级菜单,有游客模式和用户模式，游客模式则没有二级菜单，用户模式则有二级菜单，游客模式点击客户头像是转到登陆界面，用户模式点击头像则是转到个人主页
 */

/**
 * 用户模式可以看到二级菜单
 */
function userMode() {
    var userHead = document.getElementsByClassName('user-head-container')[0]; //用户头像
        secondMenu = document.getElementsByClassName('second-menu')[0]; //二级菜单

    userHead.onmouseover = function() {
        addClass(header, 'active-header');
        secondMenu.onmouseleave = function() {
            removeClass(header, 'active-header');
        }
    };
    $('#head-pic')[0].onclick = function() {
        window.location.href = 'http://' + window.ip + ':8080/qgmovie/user/info';
    }
};

/**
 * 游客模式只提供登陆入口
 */
function touristMode() {
    var userHead = document.getElementsByClassName('user-head-container')[0]; //用户头像

    userHead.innerHTML = '<p class="touristMode">登陆</p>';
    
    userHead.onclick = function() {
        window.location.href = 'login.html';
    }
};


/**
 * 发送请求初始化主页面
 */
(function mainPageInit() {
    var i;
    var userID = parseInt(window.location.search.substring(1));
    var json = JSON.stringify({
        "userID":  userID //传USERID
    });
    $.ajax({
    url: 'http://'+ window.ip +':8080/qgmovie/index',
    type: 'post',
    data: json,
    dataType:'json',
    processData: false,
    success: function(xhr) {
        var number,
            imgArray = new Array();

        console.log(xhr)

        number = parseInt(xhr.state);

        if (number == 0) {
            showPop('出现未知错误');
        } else {

            if (number == 2) {
                $('#head-pic')[0].setAttribute('src', xhr.headPic);
                $('#username')[0].innerText = xhr.userName;     
                userMode(); 
            } else {
                //游客模式
                touristMode();
            }

            // 图片预加载
            for (i = 0; i < xhr.hotMovies.length; i++) {
                imgArray[4 * i] = xhr.hotMovies[i].moviePic;
                imgArray[4 * i + 1] = xhr.newMovies[i].moviePic;
                imgArray[4 * i + 2] = xhr.goodMovies[i].moviePic;
                imgArray[4 * i + 3] = xhr.recMovies[i].moviePic;
            }

            // 图片预加载
            imgPreLoad(imgArray);

                createLi($('.hot-movie ul')[0], xhr.hotMovies, 6);
                createLi($('.new-movie ul')[0], xhr.newMovies, 6);
                createLi($('.high-commit-movie ul')[0], xhr.goodMovies, 6);
                createLi($('.person-recommend-movie ul')[0], xhr.recMovies, 6);
                // createRank($('.rank-container ul')[0], xhr.goodMovies[i]);
        }
    },
    error: function() {
        /* 请求失败 */
        showPop('请求失败');
    }
    });
})();

var header = document.getElementsByClassName('header')[0]; //顶部栏

/**
 * 粘性顶部栏
 */

(function() {
    document.onscroll = function() {
        if (document.documentElement.scrollTop >= 600) { 
            addClass(header, 'sticky-header');
        } else {
            removeClass(header, 'sticky-header');
        }
    }
})();

/**
 * 返回顶部缓冲函数
 */
var backToTopButton = document.getElementsByClassName('toTop-button')[0]; 

function backToTop() {
    var sHeight = document.documentElement.scrollTop;
    
    var top = function() {
        sHeight = sHeight + (0 - sHeight) / 8;

        if (sHeight < 1) {
            document.documentElement.scrollTop = 0;
            return;
        }
        document.documentElement.scrollTop = sHeight;
        requestAnimation(top);
    }
    top();
}

backToTopButton.onclick = function() {
    backToTop();
};

/**
 * 改变搜索栏样式
 */
var searchBar = document.getElementById('search-input');
(function() {
    searchBar.onclick = function() {
        addClass(this, 'active-search');
    }
    searchBar.onblur = function() {
        removeClass(this, 'active-search');
    }
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

<<<<<<< HEAD
 /**
  * 点击小圆点切换
  */
=======
/**
 * 点击小圆点切换图片
 */
>>>>>>> fdce8c88f658b4b7193d6f824e12d07dd6ae0b45
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
        removeClass(dotted[i], 'dotted-active');
    }
    addClass(dotted[index], 'dotted-active');
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
            removeClass(slide[i], 'slide-active');
        }
        addClass(slide[index], 'slide-active');
    }, 500);
}

/**
 * 左右切换按钮
 */
control[1].onclick = function () {
    if (index == 3) {
        index = 0;
    } else {
        index++;
    }
    activeAnimate();
}
control[0].onclick = function () {
    if (index == 0) {
        index = 3;
    } else {
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
        index++;
    }
    activeAnimate();
}

/**
 * 根据点击事件，让推荐模块左右移动换一批电影
 * @param {jQuery Object} $clickTarget 推荐模块的移动模块
 */
function movieMove($clickTarget) {
    if ($clickTarget.hasClass('left-arrows') === true) {
        if (!$clickTarget.parent().children(':eq(1)').children('ul').is(':animated')) {
                $clickTarget.parent().children(':eq(1)').children('ul').animate({
                left: '+=961.8px',
            }, 500, function() {
                arrowsVisibility($clickTarget)
                });
        }
    } else {
        if (!$clickTarget.parent('div').children(':eq(1)').children('ul').is(':animated')) {
                $clickTarget.parent('div').children(':eq(1)').children('ul').animate({
                left: '-=961.8px',
            }, 500, function() {
                arrowsVisibility($clickTarget)
                });
        }
    }

}

/**
 * 切换左右箭头的显示与否
 * @param {jQuery Object} $arrow 点击的箭头jq对象
 */
function arrowsVisibility($arrow) {

    /**
     * 当为最左边的时候，将左箭头display为none，不为left = 0时候，创建左箭头
     */
    if ($arrow.parent('div').children(':eq(1)').children('ul').css('left') == '0px') {
        $arrow.css('display', 'none');
    } else {
        if ($arrow.hasClass('left-arrows') == true) {
            $arrow.next().css('display', 'block');
        }
    }

    if ($arrow.parent('div').children(':eq(1)').children('ul').css('left') == '-3847.2px') {
        $arrow.css('display', 'none');
    } else {
        if ($arrow.hasClass('right-arrows') == true) {
            $arrow.prev().css('display', 'block');
        } 
    }
}



/**
 * 创造节点并且将节点输入进去
 * @param {Object} recommendArea 
 * @param {Object-Array} jsonArray 
 * @param {Number} number 
 */
function createLi(recommendArea, jsonArray, number) {
    var createFram = document.createDocumentFragment(),
        i,
        children;

    for (i = 0; i < number; i++) {
        children = document.createElement('li');
        children.setAttribute('movie-id', jsonArray[i].movieID);
        children.innerHTML = '<div class="movie-image"  movie-picture="url(http://'+ window.ip +':8080/qgmovie/img/'+ jsonArray[i].moviePic +')" ></div><div class="movie-bottom"><span>' + jsonArray[i].movieName + '</span><b>' + jsonArray[i].score.toString().slice(0,3) + '</b></div>';
        createFram.appendChild(children);
    }
    recommendArea.appendChild(createFram);
}

// /**
//  * 创建推荐的片li
//  * @param {Object} recommendArea 点击区域的对象
//  * @param {Object} json json对象 
//  */
// function createLi(recommendArea, json) {
//     recommendArea.innerHTML += '<li movie-id='+ json.movieID +'><div class="movie-image" style="background-image: url(http://'+ window.ip +':8080/qgmovie/img/)" ></div><div class="movie-bottom"><span>' + json.movieName + '</span><b>' + json.score + '</b></div></li>'
// }

/**
 * 创建排行榜
 * @param {Dom} rankContainer dom对象
 * @param {Object} json json对象
 */
function createRank(rankContainer, json) {
    rankContainer.innerHTML += '<li movie-id='+ json.movieID +'>'+ json.movieName +'</li>';
}


/**
 * 二级菜单,有游客模式和用户模式，游客模式则没有二级菜单，用户模式则有二级菜单，游客模式点击客户头像是转到登陆界面，用户模式点击头像则是转到个人主页
 */

function userMode() {
    var userHead = document.getElementsByClassName('user-head-container')[0]; //用户头像
        secondMenu = document.getElementsByClassName('second-menu')[0]; //二级菜单

    userHead.onmouseover = function() {
        addClass(header, 'active-header');
        secondMenu.onmouseleave = function() {
            removeClass(header, 'active-header');
        }
    };
    $('#head-pic')[0].onclick = function() {
        window.location.href = 'http://' + window.ip + ':8080/qgmovie/user/info';
    }
};

/**
 * 游客模式只显示登陆
 */

function touristMode() {
    var userHead = document.getElementsByClassName('user-head-container')[0]; //用户头像

    userHead.innerHTML = '<p class="touristMode">登陆</p>';
    
    userHead.onclick = function() {
        window.location.href = 'login.html';
    }
};

/**
 * 发送请求初始化主页面
 */

(function mainPageInit() {
    var i;

    $.ajax({
    url: 'http://'+ window.ip +':8080/qgmovie/index',
    type: 'post',
    dataType:'json',
    processData: false,
    success: function(xhr) {
        var number,
            imgArray = new Array();

        number = parseInt(xhr.state);

        if (number == 0) {
            alert('出现未知错误');
        } else {

            if (number == 2) {
                $('#head-pic')[0].setAttribute('src', xhr.headPic);
                $('#username')[0].innerText = xhr.userName;     
                userMode(); 
            } else {
                //游客模式
                touristMode();
            }

            // 图片预加载
            for (i = 0; i < xhr.hotMovies.length; i++) {
                imgArray[4 * i] = xhr.hotMovies[i].moviePic;
                imgArray[4 * i + 1] = xhr.newMovies[i].moviePic;
                imgArray[4 * i + 2] = xhr.goodMovies[i].moviePic;
                imgArray[4 * i + 3] = xhr.recMovies[i].moviePic;
            }

            // 将所有的图片进行图片预加载
            imgPreLoad(imgArray);
            createLi($('.hot-movie ul')[0], xhr.hotMovies, 20);
            createLi($('.new-movie ul')[0], xhr.newMovies, 20);
            createLi($('.high-commit-movie ul')[0], xhr.goodMovies, 20);
            createLi($('.person-recommend-movie ul')[0], xhr.recMovies, 20);
            // createRank($('.rank-container ul')[0], xhr.goodMovies[i]);
        }
    },
    error: function() {
        /* 请求失败 */
        alert('请求失败');
    }
    });
})();

/**
 * 注销函数
 */
function logout() {
    $.ajax({
    	url: 'http://'+ window.ip +':8080/qgmovie/logout',
    	type: 'get',
        dataType: 'json',
    	processData: false,
        success: function(xhr) {
             switch(xhr.state) {
                 case '0': {
                     /**
                      * 注销失败的操作
                      */
                     console.log("注销失败");
                     break;
                 }
                 case '6': {
                    /* 注销成功的操作 */ 
                    console.log("注销成功");
                    break;
                 }
             }
        },
        error: function() {
            /**
             * 请求失败的操作
             */
        }
        });
}



/**
 * 主页面的点击事件委托主函数
 * @param {Object} event 事件对象
 */
function mainPageClick(event) {
    /**
     * 缺少跳转到详情页面的功能
     */
    switch (true) {

        /**
         * 这两个都是判断点击的是不是电影
         */
        case ($(event.target).parent()[0].tagName === 'LI'): {
            pageJump(movieID)
            // pageJump(event.getAttribute('movie-id'));
            break;
        }
        case ($(event.target).parents()[1].tagName === 'LI'): {
            pageJump(movieID)
            break;
        }
        /**
         * 主页面中间部分的推荐转换
         */
        case (hasClass(event.target, 'arrows')): {
            movieMove($(event.target));
            break;
        }

        case (event.target == $('#logout')[0]): {
            logout();
            break;
        }
    }
    // case ($('.search-button')[0]): {
    //     searchCommit();
    // }
}

/**
 * 用url传参进行进行页面的跳转
 * @param {string} movieID 电影的ID
 */
function pageJump(movieID) {
    var target = 'login.html?movie=' + movieID;
    window.location.href = target;
}
EventUtil.addHandler(document, 'click', mainPageClick);
window.onmousewheel = function() {
    lazyLoad($('.hot-movie ul li'));
    lazyLoad($('.new-movie ul li'));
    lazyLoad($('.person-recommend-movie ul li'));
    lazyLoad($('.high-commit-movie ul li'));
}