const { defineConfig } = require('@vue/cli-service');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'dist-production',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      extensions: ['*', '.js', '.vue', 'ts'],
    },
  },
});
