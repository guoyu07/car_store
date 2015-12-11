
define(function(require, exports, module) {
  var storeApi = require('storeApi');

  /*
   * 处理安装动作
   */
  var installAction = function(metadata) {
    var id = metadata.id;
    var status = metadata.status;

    // storeApi.setup(id).then(function(data) {
    //   console.log(111111111)
    //   console.log(data)
    // });

    // require 解决循环依赖问题
    require('storeUI').renderSetupMsg({
      'logo': metadata.logo,
      'content': metadata.name + ' 将会很快就运到您的司南盒子上！'
    });
  };
  /*
   * 处理卸载动作
   */
  var uninstallAction = function(metadata) {

  };

  return {
    operateAction: function() {
      var target = $(event.target);
      var metadata = target.parents('.app-meta').data();

      if(metadata) {
        var status = metadata.status;
        var operate = metadata.operate;

        if(operate[status][0] == 'install') {
          installAction(metadata);

          metadata.status = 'true';

          // 改变按钮状态
          require('storeUI').updateOperateState(target, metadata);
        }
        else if(operate[status][0] == 'uninstall') {
          uninstallAction(metadata);

          // 改变按钮状态
          require('storeUI').updateOperateState(target, metadata);
        }
      }
    }
  };
});
