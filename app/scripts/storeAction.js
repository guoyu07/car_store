
define(function(require, exports, module) {
  var storeApi = require('storeApi');

  return {
    /*
     * 处理安装动作
     */
    installAction: function() {
      var target = $(event.target);
      var meta = target.parents('.app-meta');

      if(meta.length > 0 && target.hasClass('install')) {
        var id = meta.data('id');
        var status = meta.data('status');

        if(status === 'false') { // 表示未安装应用
          storeApi.setup(id).then(function(data) {
            console.log(111111111)
            console.log(data)
          });

          meta.data('status', 'true');

          var storeUI = require('storeUI');

          storeUI.renderSetupMsg({
            'logo': meta.data('logo'),
            'content': meta.data('name') + ' 将会很快就运到您的司南盒子上！'
          });
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
