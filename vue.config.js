const { defineConfig } = require('@vue/cli-service');
const unpluginVueSetup =
  require('unplugin-vue-setup-extend-plus/webpack').default;

const isProd = process.env.NODE_ENV === 'production';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const target = 'http://1.15.66.88:8081';

module.exports = defineConfig({
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  lintOnSave: false,
  assetsDir: 'assets',
  publicPath: './',
  devServer: {
    port: 1024,
    open: true,
    hot: true,
    // host: '127.0.0.1',
    // proxy: target,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
  },
  configureWebpack: (config) => {
    if (!isProd) {
      config.target = 'web';
    }
    config.devtool = isProd ? 'source-map' : 'eval-cheap-module-source-map';

    Object.assign(config, {
      resolve: {
        alias: {
          '@': resolve('src'),
        },
        extensions: ['*', '.js', '.vue', '.ts'],
      },
      plugins: [unpluginVueSetup()],
    });
  },
  chainWebpack: (config) => {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
});
