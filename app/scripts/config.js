
require.config({
  baseUrl: 'scripts',
  paths: {
    'flexslider': './plugins/jquery.flexslider',
    'scrollstop': './plugins/jquery.scrollstop',
    'jquery': '../../bower_components/jquery/dist/jquery',
  },
  shim: {
    'jquery': {
      deps: [],
      exports: '$'
    },
    // 亦可以不改动插件的情况下, 兼容 requirejs
    // 'flexslider': {
    //   deps: ['jquery']
    // }
  }
});
