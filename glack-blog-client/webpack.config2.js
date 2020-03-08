const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vuxLoader = require('vux-loader')
const webpack = require('webpack')
// vue.config.js
const webpackConfig = {
  devServer: {
    historyApiFallback: true,
    proxy: [{
      target: 'http://glack.heiheiheiheihei.xyz',  // 代理跨域目标接口
      changeOrigin: true,
      secure: false,  // 当代理某些https服务报错时用
      cookieDomainRewrite: false
    }],
    noInfo: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        lintOnSave: true,
        publicPath: process.env.NODE_ENV === 'production'
          ? '/admin/'
          : '/',
        outputDir: __dirname + '/../glack-blog-serve/dist'
      }
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'duplicate-style']
})


111
s2222sssfdsfds

fdsfdsf