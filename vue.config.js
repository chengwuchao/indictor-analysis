const { defineConfig } = require('@vue/cli-service');

const isProd = process.env.NODE_ENV === 'production';
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'dist-production',
  devServer: {
    hot: true,
  },
  configureWebpack: (config) => {
    config.resolve.alias = { '@': resolve('src') };
    config.resolve.extensions = ['*', '.js', '.vue', '.ts'];
    if (!isProd) {
      config.target = 'web';
    }
    config.devtool = isProd ? 'source-map' : 'eval-cheap-module-source-map';
  },
});

function resolve(dir) {
  return path.join(__dirname, dir);
}
