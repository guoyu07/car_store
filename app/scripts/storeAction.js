
define(function(require, exports, module) {
  var storeApi = require('storeApi');

  /*
   * 处理安装动作
   */
  var installAction = function(target, metadata) {
    var id = metadata.id;
    var status = metadata.status;
    var storeUI = require('storeUI'); // require 解决循环依赖问题

    metadata.status = 'true';

    storeApi.install(id).then(function(data) { // 安装成功
      storeUI.renderSetupMsg({
        'logo': metadata.logo,
        'content': metadata.name + ' 将会很快就安装到您的司南盒子上！'
      });
      // 改变按钮状态
      storeUI.updateOperateState(target, metadata);

    }, function() { // 安装失败
      metadata.status = 'false';

      storeUI.renderOperateErrorMsg('安装失败，请稍后再试。', function() {
        // 模拟点击安装
        setTimeout(function() {
          target.get(0).click();
        }, 700);
      })
    });
  };
  /*
   * 处理卸载动作
   */
  var uninstallAction = function(target, metadata) {
    var id = metadata.id;

    storeApi.uninstall(id).then(function(data) {
      target.closest('li').addClass('fadeOutLeft slideUp');
    }, function() {
      var storeUI = require('storeUI');

      storeUI.renderOperateErrorMsg('卸载失败，请稍后再试。', function() {
        // 模拟点击卸载
        setTimeout(function() {
          target.get(0).click();
        }, 700);
      });
    });
  };


  /* 暴露给移动端调用的接口 */

  /*
   * 主动刷新应用列表
   */
  window.refreshAppList = function() {
    storeApi.getAppList().then(function(data) {
      require('storeUI').renderAppList(data);
    })
  };
  /*
   * 主动刷新我的应用列表
   */
  window.refreshMyAppList = function() {
    storeApi.getMyAppList().then(function(data) {
      require('storeUI').renderMyAppList(data);
    });
  };


  return {
    operateAction: function() {
      var target = $(event.target);
      var metadata = target.parents('.app-meta').data();

      if(target.parent().hasClass('app-operate')) {
        if(metadata) {
          var status = metadata.status;
          var operate = metadata.operate;

          if(operate[status][0] == 'install') {
            installAction(target, metadata);
          }
          else if(operate[status][0] == 'uninstall') {
            uninstallAction(target, metadata);
          }
        }
      }
    }
  };
});
