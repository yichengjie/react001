let webpack = require("webpack");
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let devMiddleWare = require('webpack-dev-middleware');
let hotMiddleWare = require('webpack-hot-middleware');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包

console.info(ExtractTextPlugin) ;



let baseConfig = require('./webpack.base.config');
let devOption = {
    entry: {
        main:[
            'webpack-hot-middleware/client',
            __dirname + '../src/entry.js'
        ],
    },
    output: {
        path: '/',
        // publicPath: '/'
    },
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template.html' 
        }),
        new ExtractTextPlugin('main.css'),
    ]
}


module.exports = function(app){
    let webpackconfig = Object.assign({}, baseConfig, devOption);// console.log(webpackconfig);
    var compiler = webpack(webpackconfig);// console.log(compiler);
    app.use(devMiddleWare(compiler,{
    publicPath: webpackconfig.output.publicPath,
        stats: {
        colors: true,
        chunks: false
        }
    }));
    app.use(hotMiddleWare(compiler));
    return app;
}