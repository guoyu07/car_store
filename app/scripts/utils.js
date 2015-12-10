
/*
 * 一些工具方法
 */
define({
  getURLParam: function(name) {
    var search = window.location.search;
    var regExp = new RegExp(name+'=([^&?]*)', 'ig');

    return search.match(regExp)[0].substr(name.length+1);
  }
});
