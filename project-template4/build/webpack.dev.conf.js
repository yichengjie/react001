var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';

config.plugins = [
    new HtmlWebpackPlugin({
        //filename: '../index.html',/**(上线环境)这个目录是相对于output的path当前目录作为基目录的 */
        filename: 'index.html',/**(开发环境)这个目录是相对于output的path当前目录作为基目录的 */
        template: path.resolve(__dirname, '../src/html/index.html'),
        inject: true
    })
];

module.exports = config;