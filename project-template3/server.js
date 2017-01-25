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

app.use(webpackDevMiddleware(compiler,webpacDevOption)) ;

app.use(webpackHotMiddleware(compiler)) ;

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