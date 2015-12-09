
require(['jquery', 'utils', 'store'], function($, utils, store){
  // 修复 iOS safari :active 伪类不起作用的问题
  document.body.addEventListener('touchstart', function(){});

  // 一个简单路由
  var body = $('body');
  if(body.hasClass('store-home')) {
    store.store_home_page();
  }
  else if(body.hasClass('store-app')) {
    var appId = utils.getURLParam('id')
    store.store_app_page(appId);
  }
  else if(body.hasClass('store-myapps')) {
    store.store_myapps_page();
  }
});
