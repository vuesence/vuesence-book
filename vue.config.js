module.exports = {
  publicPath: './',
  // chainWebpack: config => {
  //   config
  //     .plugin('html')
  //     .tap(args => {
  //       args[0].minify = false
  //       return [ /* новые args для передачи в конструктор html-webpack-plugin */ ]
  //     })
  // }
  configureWebpack: {
    devtool: 'source-map'
  }
}
