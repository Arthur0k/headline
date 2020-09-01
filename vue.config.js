const path = require('path')

module.exports = {
  devServer: {
    open: true
    // proxy: 'http://127.0.0.1:3000'
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: path.join('@/views'),
        components: path.join('@/components'),
        utils: path.join('@/common/utils')
      }
    }
  }
}
