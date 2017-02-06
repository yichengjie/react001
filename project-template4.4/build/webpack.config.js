// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin') ;

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    //webpack-hot-middleware/client?reload=true//后面的?reload=true必须加上，否则不自动刷新
    //下面的这种多入口也是可以的
    // page1: [
    //     path.resolve(__dirname, '../src/index.js'),
    //     'webpack-hot-middleware/client?reload=true',
    //  ]
    entry:{
      index:  path.resolve(__dirname, '../src/index.js'),
      vendors: [
        'react','react-dom'
      ]
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',//(线上环境)
        //publicPath: '/',//(开发环境)
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
     module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include:  [
                    path.resolve(__dirname,'../src')
                ],
                exclude: /node_modules/,
                loaders:['react-hot','babel']
            },
            { test: /\.css$/, loader: "style!css!postcss"},
            { test: /\.scss$/, loader: "style!css!postcss!sass"},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'},
            {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'url',
             query: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
             }
            },
            {test: /\.(png|jpg|gif|svg)$/,loader: 'file',
             query: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
             }
            }
        ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
        
    ]
}