var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
// 引入基本配置
var config = require('./webpack.config');
var webpack = require('webpack') ;

config.output.publicPath = '/';

config.plugins = [
    // 添加三个插件
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        //filename: '../index.html',/**(上线环境)这个目录是相对于output的path当前目录作为基目录的 */
        filename: 'index.html',/**(开发环境)这个目录是相对于output的path当前目录作为基目录的 */
        template: path.resolve(__dirname, '../src/html/index.html'),
        inject: true
    })
];

// 动态向入口配置中注入 webpack-hot-middleware/client?reload=true
var devClient = 'webpack-hot-middleware/client?reload=true';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})

module.exports = config;