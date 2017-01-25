'use strict';
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin') ;
var path = require('path') ;
var fs = require('fs') ;
var webpack = require('webpack') ;



module.exports = {
    devtool: '#source-map',
    entry: {
        app:['./src/entry.js'],
        vendors:['react','react-dom']
    },
    output: {
        path:path.resolve(__dirname,'dist'), //打包后的文件存放的地方
        filename: '[name].js', //打包后输出文件的文件名
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
                include: path.resolve(__dirname,'src'),
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
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV),
            __DEV__:false
        }),
        new ExtractTextPlugin('main.css',{
            allChunks:true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                unused:true,
                dead_code:true
            }
        }),
        // new HtmlWebpackPlugin({
        //     title: 'My App',
        //     template:'template.html',
        //     filename: 'index.html'
        // })
    ]

}
