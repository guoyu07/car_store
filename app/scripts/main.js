
require(['jquery', 'store', 'flexslider'], function($, store){
  console.log('hello require!' + $('body'));
  console.log($.flexslider)

  store();
});
