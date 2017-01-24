let express = require('express');
let webpack = require("webpack");
const fs = require('fs')
let app = express()
let port;
let webpackconfig = require('./build/webpack.dev.config.js');
webpackconfig(app)

app.use(express.static('./static'));
app.get('/', function(req, res, next){
    next();
})
 
app.listen(port || 3000, function(e){
    console.log(`server start at ${port}`);
});



