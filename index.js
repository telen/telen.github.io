"use strict";

$(document).ready(function() {
    var WIDTH = window.innerWidth;
    var flipWidth = WIDTH / 24;

    $('.flip').mouseenter(function() {
        if (!$(this).hasClass('hover')) {
            $(this).addClass('hover');
        }
    });

    $(".flip").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
        $(this).removeClass("hover");
    });

    /*
     * 说明：这里间接实现了hover一样的touch效果。
     *      touchevent move时检测到的target对象始终是touchstart的对象，不会变化。
     *      所以使用touch移动的位置判断处于哪个flipover元素。
     */
    $('.cover').bind('touchmove', function(e) {
        var pageX = e.originalEvent.targetTouches[0].pageX;
        var index = Math.floor(pageX / flipWidth) + 1;

        var $flip = $('.cover .flip:nth-child(' + index + ')');
        if (!$flip.hasClass('hover')) {
            $flip.addClass('hover');
        }
    });
});
