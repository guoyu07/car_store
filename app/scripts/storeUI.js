
define(['const', 'storeAction'], function($const, storeAction) {

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

          appListHTML += '<li class="app-meta" data-id="' + app.id + '" data-package="' + app.packagename + '" data-status="' + app.status + '">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + server + app.logo + '"></div>' +
              '<div class="app-info">' +
                '<div class="app-name">' + app.name + '</div>' +
                '<div class="app-summary">' + app.resume + '</div>' +
              '</div></a>' +
              '<div class="app-operate"><a href="javascript:void(0);" class="' + operateClass + '">' + operateText + '</a></div>' +
          '</li>';
        });
        appList.html(appListHTML);
        appList.click(storeAction.installAction); // 采用委托机制
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
          var operateText = app.status === 'true' ? '卸载' : '安装';
          var operateClass = app.status === 'true' ? 'uninstall' : 'install';

          appListHTML += '<li class="app-meta" data-id="' + app.id + '" data-package="' + app.packagename + '" data-status="' + app.status + '">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + server + app.logo + '"></div>' +
              '<div class="app-info">' +
                '<div class="app-name">' + app.name + '</div>' +
                '<div class="app-version">版本 ' + app.version_name + '</div>' +
                '<div class="app-size">' + app.softsize + ' M</div>' +
              '</div></a>' +
              '<div class="app-operate"><a href="javascript:void(0);" class="' + operateClass + '">' + operateText + '</a></div>' +
          '</li>';
        });
        myAppList.html(appListHTML);
        myAppList.click(storeAction.installAction);
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
          '<div class="app-version">版本 ' + data.version_name + '</div>' +
          '<div class="app-size">' + data.softsize + ' M</div>' +
        '</div>' +
        '<div class="app-operate"><a href="javascript:void(0);" class="' + operateClass + '">' + operateText + '</a></div>';

        appInfo.addClass('app-meta').attr({
          'data-id': data.id,
          'data-package': data.packagename,
          'data-status': data.status
        });
        appInfo.html(appInfoHTML);
        appInfo.click(storeAction.installAction);

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
    },

    /*
     * 安装应用提示消息 UI
     */
    renderSetupMsg: function(message) {
      var msgHTML = '<div class="msg"><ul class="app2sinan">' +
        '<li class="left" style="background-image:url(images/test/app1.png)"></li>' +
          '<li class="middle"></li>' +
          '<li class="right"></li>' +
        '</ul>' +
        '<div class="content">支付宝 将会很快就运到您的司南盒子上！</div>' +
        '<div class="operate"><a href="#">好的</a></div>' +
      '</div>';
    },

    /*
     * 更新 安装与卸载按钮的状态
     */
    updateOperateState: function(button) {
      // 时间限制在 300 ~ 1300
      var millisec = Math.round(Math.random() * 1000 + 300);

      setTimeout(function() {
        if(button.hasClass('install')) {
          button.text('已安装')
            .addClass('installed')
            .removeClass('install');
        }
        else if(button.hasClass('installed')) {
          button.text('安装')
            .addClass('install')
            .removeClass('installed');
        }
      }, millisec);
    }
  }
});
