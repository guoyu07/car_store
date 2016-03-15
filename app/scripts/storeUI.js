
define(['const', 'utils', 'storeAction'], function($const, utils, storeAction) {

  var server = $const.server;

  /*
   * 清除应用列表 UI
   */
  var clearAppList = function(appList) {
    if(appList.is(':empty') == false) {
      appList.empty().unbind();
    }
  };
  /*
   * 清除我的应用列表 UI
   */
  var clearMyAppList = function(myAppList) {
    if(myAppList.is(':empty') == false) {
      myAppList.empty().unbind();
    }
  };
  /*
   * 应用详情页的截图位置 优化
   */
  var screenshotsOptimize = function(screenshots, complete) {
    var prev, next;

    screenshots.find('li').each(function() {
      var posLeft = $(this).position().left;

      if (posLeft < 0) {
        prev = $(this); // prev 为刚好超越左边界的截图
      } else if (posLeft >= 0) {
        next = $(this); // next 为第一个未超越左边界的截图

        return false;
      }
    });

    if(prev) {
      var delta = 0;
      var scrollLeft = screenshots.scrollLeft();
      var screenshotWidth = prev.outerWidth(true);
      var prevPosLeft = Math.abs(prev.position().left);

      // 未越过截图宽度的一半
      if(prevPosLeft < screenshotWidth / 2) {
        delta = - prevPosLeft; // 右移
      } else {
        delta = screenshotWidth - prevPosLeft; // 左移
      }

      screenshots.animate({
        'scrollLeft': scrollLeft + delta
      }, 300, function() {
        complete && complete.call();
      });
    } else {
      complete && complete.call();
    }
  };

  return {
    /*
     * 设置应用列表的界面
     */
    renderAppList: function(data) {
      var appList = $('#appList');

      if(data && data.length) {
        clearAppList(appList);

        data.map(function(app) {
          var operate = {
            'true': ['installed', '已安装'],
            'false': ['install', '安装']
          };

          var appHTML = '<li class="app-meta">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + app.logo + '"></div>' +
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
            'logo': app.logo,
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
        clearMyAppList(myAppList);

        data.map(function(app) {
          app.status = 'true'; // 只有唯一状态

          var operate = {
            'true': ['uninstall', '卸载'],
          };

          var appHTML = '<li class="app-meta">' +
            '<a href="app.html?id=' + app.id + '">' +
              '<div class="app-logo"><img src="' + app.logo + '"></div>' +
              '<div class="app-info">' +
                '<div class="app-name">' + app.name + '</div>' +
                '<div class="app-version">版本 ' + app.version_name + '</div>' +
                '<div class="app-size">' + utils.bytesToX(app.softsize) + '</div>' +
              '</div></a>' +
              '<div class="app-operate">' +
                '<a href="javascript:void(0);" class="' + operate[app.status][0] + '">' + operate[app.status][1] + '</a>' +
            '</div></li>';
          var appELEM = $(appHTML);

          // 缓存数据
          appELEM.data({
            'id': app.id,
            'name': app.name,
            'logo': app.logo,
            'package': app.packagename,
            'status': app.status,
            'operate': operate
          });
          myAppList.append(appELEM);

          appELEM.height(appELEM.height());
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
        appInfoHTML = '<div class="app-logo"><img src="' + data.logo + '"></div>' +
          '<div class="app-info">' +
          '<div class="app-name">' + data.name + '</div>' +
          '<div class="app-version">版本 ' + data.version_name + '</div>' +
          '<div class="app-size">' + utils.bytesToX(data.softsize) + '</div>' +
        '</div>' +
        '<div class="app-operate">' +
          '<a href="javascript:void(0);" class="' + operate[data.status][0] + '">' + operate[data.status][1] + '</a>' +
        '</div>';

        // 缓存数据
        appInfo.addClass('app-meta').data({
          'id': data.id,
          'name': data.name,
          'logo': data.logo,
          'package': data.packagename,
          'status': data.status,
          'operate': operate
        });
        appInfo.html(appInfoHTML);
        appInfo.click(storeAction.operateAction);

        // 应用截图
        if(data.screenshots && data.screenshots.length > 0) {
          data.screenshots.map(function(imageUrl) {
            appScreenshotsHTML += '<li><img src="' + imageUrl + '"></li>';
          });
          appScreenshots.html('<ul>' + appScreenshotsHTML + '</ul>');

          appScreenshots.bind('scrollstop', function handler() {
            var self = $(this);

            self.unbind('scrollstop');
            // 优化应用截图
            screenshotsOptimize(self, function() {
              // 动画回调: 恢复注册事件
              self.bind('scrollstop', handler);
            });
          });
        }

        // 应用介绍
        appIntro.html(data.describe);
      }
    },

    /*
     * 提示消息
     */
    renderMsg: function(options) {
      var opts = $.extend({
        message: '<div class="msg"></div>',
        mask: null,      // {String}   遮罩层自定义样式类
        onClose: null    // {Function} 关闭弹框, 默认会匹配 class 为 close 的按钮
      }, options);

      var mask = $('#mask');

      mask.html(opts.message);
      mask.addClass(opts.mask).addClass('visible');

      // 关闭弹框
      mask.find('.close').click(function() {
        mask.removeClass(opts.mask).removeClass('visible');

        opts.onClose && opts.onClose();
      });
    },
    /*
     * 未联网提示消息
     */
    renderOutLineMsg: function(message) {
      message = message ? message : '当前网络不可用，请检查你的网络设置。';

      this.renderMsg({
        message: '<div class="msg msg-custom">' +
                   '<div class="content">' + message + '</div>' +
                   '<div class="operate"><a href="javascript:void(0);" class="close">重试</a></div>' +
                 '</div>',
        mask: 'mask-dark',
        onClose: function() { window.location.reload(); }
      });
    },
    /*
     * 服务器错误提示消息
     */
    renderServerErrorMsg: function(message) {
      message = message ? message : '无法访问应用市场，请稍后再试。';

      this.renderMsg({
        message: '<div class="msg">' +
                   '<div class="content">' + message + '</div>' +
                   '<div class="operate"><a href="javascript:void(0);" class="close">重试</a></div>' +
                 '</div>',
        onClose: function() { window.location.reload(); }
      });
    },
    /*
     * 安装卸载应用失败提示消息
     */
    renderOperateErrorMsg: function(message, onClose) {
      message = message ? message : '操作失败，请稍后再试。';

      this.renderMsg({
        message: '<div class="msg">' +
                   '<div class="content">' + message + '</div>' +
                   '<div class="operate"><a href="javascript:void(0);" class="close">重试</a></div>' +
                 '</div>',
        onClose: onClose
      });
    },
    /*
     * 安装应用提示消息 UI
     */
    renderSetupMsg: function(message) {
      var mask = $('#mask');

      var msgHTML = '<div class="msg">' +
        // '<ul class="app2sinan">' +
        //   '<li class="left" style="background-image:url(' + message.logo + ')"></li>' +
        //   '<li class="middle"></li>' +
        //   '<li class="right"></li>' +
        // '</ul>' +
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
