
define(['const'], function($const) {

  var server = $const.server;

  return {
    /*
     * 设置应用列表的界面
     */
    renderAppList: function(data) {
      var appList = $('#appList');

      if(data && data.length) {
        var appListHTML = '';

        data.map(function(app) {
          var operateText = app.status === 'true' ? '已安装' : '安装';
          var operateClass = app.status === 'true' ? 'installed' : 'install';

          appListHTML += '<li data-id="' + app.id + '" data-package="' + app.packagename + '">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + server + app.logo + '"></div>' +
              '<div class="app-info">' +
                '<div class="app-name">' + app.name + '</div>' +
                '<div class="app-summary">' + app.resume + '</div>' +
              '</div></a>' +
              '<div class="app-operate ' + operateClass + '"><a href="#">' + operateText + '</a></div>' +
          '</li>';
        });
        appList.html(appListHTML);
      }
    },

    /*
     * 我的应用列表 UI
     */
    renderMyAppList: function(data) {
      var myAppList = $('#myAppList');

      if(data && data.length) {
        var appListHTML = '';

        data.map(function(app) {
          var operateText = app.status === 'true' ? '已安装' : '安装';
          var operateClass = app.status === 'true' ? 'installed' : 'install';

          appListHTML += '<li data-id="' + app.id + '" data-package="' + app.packagename + '">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + server + app.logo + '"></div>' +
              '<div class="app-info">' +
                '<div class="app-name">' + app.name + '</div>' +
                '<div class="app-version">版本 1.0</div>' +
                '<div class="app-size">12.9 M</div>' +
              '</div></a>' +
              '<div class="app-operate ' + operateClass + '"><a href="#">' + operateText + '</a></div>' +
          '</li>';
        });
        myAppList.html(appListHTML);
      }
    },

    /*
     * 设置应用详情页的 UI
     */
    renderAppDetail: function(data) {
      var appInfo = $('#appInfo');
      var appScreenshots = $('#appScreenshots');
      var appIntro = $('#appIntro');

      var appInfoHTML = appScreenshotsHTML = '';

      if(data) {
        var operateText = data.status === 'true' ? '已安装' : '安装';
        var operateClass = data.status === 'true' ? 'installed' : 'install';

        // 应用信息
        appInfoHTML = '<div class="app-logo"><img src="' + server + data.logo + '"></div>' +
          '<div class="app-info">' +
          '<div class="app-name">' + data.name + '</div>' +
          '<div class="app-version">版本 1.0</div>' +
          '<div class="app-size">12.9 M</div>' +
        '</div>' +
        '<div class="app-operate ' + operateClass + '"><a href="#">' + operateText + '</a></div>';
        appInfo.attr({
          'data-id': data.id,
          'data-package': data.packagename
        });
        appInfo.html(appInfoHTML);

        // 应用截图
        if(data.screenshots && data.screenshots.length > 0) {
          data.screenshots.map(function(imageUrl) {
            appScreenshotsHTML += '<li><img src="' + server + imageUrl + '"></li>';
          });
          appScreenshots.html(appScreenshotsHTML);
        }

        // 应用介绍
        appIntro.html(data.describe);
      }

      console.log(data)
    }
  }
});
