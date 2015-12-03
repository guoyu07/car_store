
require(['jquery', 'store'], function($, store){
  // 修复 iOS safari :active 伪类不起作用的问题
  document.body.addEventListener('touchstart', function(){});

  // store();
});
