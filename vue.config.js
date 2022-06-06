const { defineConfig } = require('@vue/cli-service');

const isProd = process.env.NODE_ENV === 'production';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'dist-production',
  devServer: {
    hot: true,
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
    });
  },
  chainWebpack: (config) => {},
});
