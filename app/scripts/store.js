
define(['flexslider'], function(){

  // 应用市场主页焦点图
  $('#banner').flexslider({
    animation: 'slide',
    easing: 'ease',
    directionNav: false,
    animationSpeed: 300,
    slideshowSpeed: 5000,
    slideshow: true, // 是否自动播放
    init: function() {
      console.log(111)
    }
  });


    // var Zombie = function(){
    //     // zombie stuff
    //     console.log('wo shi module')
    // }
    // return Zombie;
})
