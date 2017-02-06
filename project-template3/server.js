'use strict'
var path = require('path') ;
var express = require('express') ;
var webpack = require('webpack') ;
var config = require('./webpack.config.dev.js') ;
var webpackDevMiddleware = require('webpack-dev-middleware') ; 
var webpackHotMiddleware = require('webpack-hot-middleware') ;


var app  = express() ;
var compiler = webpack(config) ;

var webpacDevOption = {
    noInfo:true,
    historyApiFallback:true,
    publicPath:config.output.publicPath,
    headers:{
        'Access-Control-Allow-Origin':'*'
    }
} ;


var devMiddleware = webpackDevMiddleware(compiler,webpacDevOption) ;
var hotMiddleware = webpackHotMiddleware(compiler,{
    log:()=>{}
}) ;
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
}) ;


app.use(devMiddleware) ;
app.use(hotMiddleware) ;



app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'index.html')) ;
}) ;

app.listen(3000,'localhost',function(err){
    if(err){
        console.log(err) ;
        return ;
    }
    console.log('Listening at http://localhost:3000') ;
}) ;