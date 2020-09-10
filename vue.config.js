const path = require('path')

module.exports = {
  devServer: {
    open: true,
    // proxy: 'http://127.0.0.1:3000'
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: '/api',
        secure: true
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      moment: 'moment'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: path.join('@/views'),
        components: path.join('@/components'),
        utils: path.join('@/common/utils'),
        assets: path.join('@/assets')
      }
    }
  }
}
