
/*
 * 一些工具类
 */
define({
  getURLParam: function(name) {
    var search = window.location.search;
    var regExp = new RegExp(name+'=([^&?]*)', 'ig');

    return search.match(regExp)[0].substr(name.length+1);
  }
});
