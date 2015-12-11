
define(['const', 'storeAction'], function($const, storeAction) {

  var server = $const.server;

  return {
    /*
     * 设置应用列表的界面
     */
    renderAppList: function(data) {
      var appList = $('#appList');

      if(data && data.length) {
        data.map(function(app) {
          var operate = {
            'true': ['installed', '已安装'],
            'false': ['install', '安装']
          };

          var appHTML = '<li class="app-meta">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + server + app.logo + '"></div>' +
              '<div class="app-info">' +
                '<div class="app-name">' + app.name + '</div>' +
                '<div class="app-summary">' + app.resume + '</div>' +
              '</div></a>' +
              '<div class="app-operate">' +
                '<a href="javascript:void(0);" class="' + operate[app.status][0] + '">' + operate[app.status][1] + '</a>' +
            '</div></li>';
          var appELEM = $(appHTML);

          // 缓存数据
          appELEM.data({
            'id': app.id,
            'name': app.name,
            'logo': server + app.logo,
            'package': app.packagename,
            'status': app.status,
            'operate': operate
          });
          appList.append(appELEM);
        });

        appList.click(storeAction.operateAction); // 采用委托机制
      }
    },

    /*
     * 我的应用列表 UI
     */
    renderMyAppList: function(data) {
      var myAppList = $('#myAppList');

      if(data && data.length) {

        data.map(function(app) {
          var operate = {
            'true': ['uninstall', '卸载'],
            'false': ['install', '安装']
          };

          var appHTML = '<li class="app-meta">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + server + app.logo + '"></div>' +
              '<div class="app-info">' +
                '<div class="app-name">' + app.name + '</div>' +
                '<div class="app-version">版本 ' + app.version_name + '</div>' +
                '<div class="app-size">' + app.softsize + ' M</div>' +
              '</div></a>' +
              '<div class="app-operate">' +
                '<a href="javascript:void(0);" class="' + operate[app.status][0] + '">' + operate[app.status][1] + '</a>' +
            '</div></li>';
          var appELEM = $(appHTML);

          // 缓存数据
          appELEM.data({
            'id': app.id,
            'name': app.name,
            'logo': server + app.logo,
            'package': app.packagename,
            'status': app.status,
            'operate': operate
          });
          myAppList.append(appELEM);
        });

        myAppList.click(storeAction.operateAction);
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
        var operate = {
          'true': ['installed', '已安装'],
          'false': ['install', '安装']
        };

        // 应用信息
        appInfoHTML = '<div class="app-logo"><img src="' + server + data.logo + '"></div>' +
          '<div class="app-info">' +
          '<div class="app-name">' + data.name + '</div>' +
          '<div class="app-version">版本 ' + data.version_name + '</div>' +
          '<div class="app-size">' + data.softsize + ' M</div>' +
        '</div>' +
        '<div class="app-operate">' +
          '<a href="javascript:void(0);" class="' + operate[data.status][0] + '">' + operate[data.status][1] + '</a>' +
        '</div>';

        // 缓存数据
        appInfo.addClass('app-meta').data({
          'id': data.id,
          'name': data.name,
          'logo': server + data.logo,
          'package': data.packagename,
          'status': data.status,
          'operate': operate
        });
        appInfo.html(appInfoHTML);
        appInfo.click(storeAction.operateAction);

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
      var mask = $('#mask');

      var msgHTML = '<div class="msg"><ul class="app2sinan">' +
        '<li class="left" style="background-image:url(' + message.logo + ')"></li>' +
          '<li class="middle"></li>' +
          '<li class="right"></li>' +
        '</ul>' +
        '<div class="content">' + message.content + '</div>' +
        '<div class="operate"><a href="javascript:void(0);" class="close">好的</a></div>' +
      '</div>';

      mask.html(msgHTML).addClass('visible');

      // 关闭弹框
      mask.find('.close').click(function() {
        mask.removeClass('visible');
      });
    },

    /*
     * 更新 安装与卸载按钮的状态
     */
    updateOperateState: function(button, metadata) {
      // 时间限制在 300 ~ 1300
      var millisec = Math.round(Math.random() * 1000 + 300);

      var operate = metadata.operate;
      var new_status = metadata.status;
      var old_status = new_status == 'true' ? 'false' : 'true';

      setTimeout(function() {
        button.text(operate[new_status][1])
          .addClass(operate[new_status][0])
          .removeClass(operate[old_status][0]);
      }, millisec);
    }
  }
});