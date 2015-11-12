
require(['jquery', './mymodule'], function($, mymodule){
  console.log('hello require!' + $('body'));

  mymodule();
});
