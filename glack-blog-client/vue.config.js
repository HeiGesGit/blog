// vue.config.js
module.exports = {
  // eslint-disable-next-line no-path-concat
  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
  outputDir: __dirname + '/../glack-blog-serve/dist',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/admin/'
  //   : '/',
  publicPath: "./",
  devServer: {
    proxy: {
      '/api': {    // 定义代理的名称
        target: 'http://glack.heiheiheiheihei.xyz', // 代理的域名
        changeOrigin: true,  // 是否启动代理
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  lintOnSave: false
}
