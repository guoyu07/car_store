
define(['const', 'utils'], function($const, utils) {

  var server = $const.server;
  var server1 = 'http://172.16.10.91:8080';

  var hostname = window.location.hostname;

  if(hostname == '0.0.0.0' || hostname == 'localhost') {
    utils.setCookie('sn', '8469e2920a239a83192eff5313aba');
    utils.setCookie('access_token', '2948bbd535afae81427023c9960290906dfe2786e38a22e4125129ee2d06f568');
  }

  // var sn = '8469e2920a239a83192eff5313abab82';
  // var access_token = '91cb5f82d611d528be0ada89d50ff45fcbe6e853b75f965563da68755c5d9dc4';

  var sn = utils.getCookieByKey('sn');
  var access_token = utils.getCookieByKey('access_token');

  return {
    /*
     * 获得登录的 access_token (已作废)
     */
    login: function() {
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: server + '/oauth/token.json',
        data: {
          'phone': '15920191911',
          'password': '1234567890',
          'grant_type': 'password',
          'client_id': 'dbf597e4656661c6115b8603f277a899878c7a707cbfd241bf351da49a278d6d',
          'client_secret': '5c5de8b32c34a29271a33ddff965bee3f75c262899f43750ed8f691c3c2f3950'
        },
        success: function(data) {
          console.log(data);
        }
      });
    },

    /*
     * 获得 Banner 焦点图
     */
     getBanner: function() {

     },

    /*
     * 获得应用列表
     */
    getAppList: function() {
      /*
      $.ajax({
        url: server1 + '/Sinan/api/v1/apps.json',
        type: 'get',
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        data: {
          // 'sn': '8469e2920a239a83192eff5313abab82'
        },
        crossDomain: true,
        headers: {
          'Authorization': 'Bearer 2da269b90d619cf96bc26570158f1aa72d9cfb395a82387ad714d73a7ab5668c'
        },
        success: function(data) {
          console.log(data);
        },
        error: function(XMLHttpRequest, textStatus) {
          console.log(textStatus);
        }
      });*/


      return $.ajax({
        url: server + '/api/v1/wares.json',
        type: 'get',
        dataType: 'json',
        data: {
          'sn': sn
        },
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
      .done(function(data, textStatus) {

      })
      .fail(function(XMLHttpRequest, textStatus, errorThrown) {

      });
    },

    /*
     * 获取我的应用列表
     */
    getMyAppList: function() {
      return $.ajax({
        url: server + '/api/v1/mywares.json',
        type: 'get',
        dataType: 'json',
        data: {
          'sn': sn
        },
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    },

    /*
     * 获取应用详情
     */
    getApp: function(appId) {
      return $.ajax({
        url: server + '/api/v1/wares/' + appId + '.json',
        type: 'get',
        dataType: 'json',
        data: {
          'sn': sn
        },
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      });
    },

    /*
     * 安装应用
     */
    install: function(appId) {
      return $.ajax({
        url: server + '/api/v1/wares.json',
        type: 'post',
        dataType: 'json',
        data: {
          'sn': sn,
          'id': appId,
        },
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      });
    },

    /*
     * 卸载应用
     */
    uninstall: function(appId) {
      return $.ajax({
        url: server + '/api/v1/wares/' + appId + '.json',
        type: 'delete',
        dataType: 'json',
        data: {
          'sn': sn
        },
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      });
    }
  };
});
