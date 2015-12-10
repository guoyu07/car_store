
define(function(require, exports, module) {

  return {
    /*
     * 处理安装动作
     */
    installAction: function() {
      var target = $(event.target);
      var meta = target.parents('.app-meta');

      if(meta.length > 0) {
        var id = meta.data('id');
        var package = meta.data('package');
        var status = meta.data('status');

        if(status === 'false') { // 表示未安装应用
          meta.data('status', 'true');

          var storeUI = require('storeUI');

          storeUI.renderSetupMsg();
          // 改变按钮状态 循环依赖解决方案
          storeUI.updateOperateState(target);
        }
      }
    },

    /*
     * 处理卸载动作
     */
    uninstallAction: function() {

      return false;
    }
  };
});
