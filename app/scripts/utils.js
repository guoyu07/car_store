
/*
 * 一些工具方法
 */
define({
  /*
   * 获取 url 参数
   */
  getURLParam: function(name) {
    var search = window.location.search;
    var regExp = new RegExp(name+'=([^&?]*)', 'ig');

    return search.match(regExp)[0].substr(name.length+1);
  },

  /*
   * 通过 cookie 的键名获得值
   */
  getCookieByKey: function(key) {
    var result = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    if(result && result[2]) {
      return result[2];
    }
    return null;
  },
  /*
   * 设置 cookie
   */
  setCookie: function(key, value) {
    var day = 30;
    var date = new Date;

    date.setTime(date.getTime() + day * 24 * 60 * 60);

    document.cookie = key + '=' + value + ';expires=' + date.toGMTString();
  }
});
