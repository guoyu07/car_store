
/*
 * 一些工具方法
 */
define({
  /*
   * 识别 IPv4 地址
   */
  identifyIPv4: function(str) {
    var result = str.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);

    if(result != null &&
      result[1] <= 255 && result[2] <= 255 &&
      result[3] <= 255 && result[4] <= 255) {
        return true;
    }
    return false;
  },
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
  },

  /*
   * 字节单位 换算为 目标单位 X
   */
  bytesToX: function(value) {
    var K = 1024;

    if(value == 0) { // 0 B
      return '0 K';
    } else {
      // 目标单位
      var X = ['B', 'K', 'M', 'G', 'T', 'PB', 'EB', 'ZB', 'YB'];
      // 计算近似冪值
      var power = Math.floor(Math.log(value) / Math.log(K));
      // 最多保留一位小数
      var result = Math.round(value / Math.pow(K, power) * 10) / 10;

      return result + ' ' + X[power];
    }
  }
});
