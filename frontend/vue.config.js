const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      }
    }
  }
})
