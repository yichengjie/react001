'use strict';
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin') ;
module.exports = {
    devtool: '#source-map',
    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/dist', //打包后的文件存放的地方
        filename: 'bundle.js', //打包后输出文件的文件名
        //publicPath:'/static'
        /**1.注意合理一定不能使用 `./dist`,否则找不到 
            2.如果不存在express提供的静态资源目录，就不要随便加这个，
            否则生成的资源地址为/dist/已dist为静态目录
            3.重要的事情说三遍:不是很了解publicPath最好不要乱用*/
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: /src/,
                exclude: /node_modules/
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
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
    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    devServer: {
        //contentBase: './build',  //本地服务器所加载的页面所在的目录
        port: 3000,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        progress: true ,
        inline: true  //实时刷新
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new HtmlWebpackPlugin({
            title: 'My App',
            template:'template.html',
            filename: 'index.html'
        })
    ]

}
