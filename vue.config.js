const { defineConfig } = require('@vue/cli-service');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'dist-production',
  configureWebpack: (config) => {
    config.resolve.alias = { '@': resolve('src') };
    config.resolve.extensions = ['*', '.js', '.vue', '.ts'];
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env.VUE_APP_MODE);
      config.target = 'web';
    }
  },
  devServer: {
    hot: true,
  },
});
