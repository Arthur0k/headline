const path = require('path')

module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // vue: path.resolve('vue/dist/vue-esm.js')
        views: path.join('@/views')
      },
      // extensions: ['.js', '.vue', '.less']
    }
  }
}
