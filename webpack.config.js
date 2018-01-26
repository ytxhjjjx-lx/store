module.exports = {
    // 入口文件
    entry: './src/main.js',
    // 出口设置
    output: {
      path: __dirname,
      filename: "src/bundle.js"
    },
    // 文件的处理方式
    module: {
      loaders: [
        {
          // 匹配以.js结尾的文件
          test: /\.js$/,
          // 使用babel-loader进行处理
          loader: 'babel-loader',
          // 排除文件目录 
          exclude: /(node_modules)/,
          // 处理参数:
          query: {
            // 转换es6语法和react的jsx语法
            presets: ['react', 'es2015']
          }
        },
        {
          // 针对css(less)文件的处理
          test: /\.(css|less)$/,
          loader: 'style-loader!css-loader!less-loader'
        }
      ]
    }
  }