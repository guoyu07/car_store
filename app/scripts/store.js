
define(['storeApi', 'storeUI', 'flexslider', 'scrollstop'], function(storeApi, storeUI){

  /*
   * 检查网络
   */
  var outLine = function() {
    if(navigator.onLine == false) { // 未联网
      storeUI.renderOutLineMsg();
      return true;
    }
    return false;
  };

  return {
    /*
     * 应用市场首页
     */
    store_home_page: function() {
      // 应用市场主页焦点图
      $('#banner').flexslider({
        // touch: false,
        animation: 'slide',
        easing: 'ease',
        controlNav: false,
        directionNav: false,
        animationSpeed: 250,
        slideshowSpeed: 5000,
        slideshow: true, // 是否自动播放
        start: function(slider) {
          // var w = (1 / slider.count * 100) + '%';
          // slider.find('.flex-control-nav li').width(w);
        }
      });

      if(outLine()) return;

      // 应用列表
      storeApi.getAppList().then(function(data) {
        storeUI.renderAppList(data);
      }, function() {
        storeUI.renderServerErrorMsg();
      })
      .then(function(data) {
        console.log(data)
      });
    },

    /*
     * 我的应用列表页
     */
    store_myapps_page: function() {

      if(outLine()) return;

      storeApi.getMyAppList().then(function(data) {
        storeUI.renderMyAppList(data);
      });
    },

    /*
     * 应用市场详情页
     */
    store_app_page: function(appId) {

      if(outLine()) return;

      storeApi.getApp(appId).then(function(data) {
        storeUI.renderAppDetail(data);
      }, function() {
        storeUI.renderServerErrorMsg();
      });
    }
  };
});
