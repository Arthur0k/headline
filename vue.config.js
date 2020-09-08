const path = require('path')

module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        views: path.join('@/views'),
        assets: path.join('@/assets'),
        components: path.join('@/components')
      },
      extensions: ['.css']
    }
  }
}
