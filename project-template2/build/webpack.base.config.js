var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
 
module.exports = {
  entry: {
    main:[__dirname + '/src/entry.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[hash].js',
  },
  module: {
    rules:[
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: /src/,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
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
  resolve: {
    extensions: ['.jsx','.js', 'json', ' '],
    alias: {
      'components': './src/',
    }
  },
  plugins: [
      new HtmlWebpackPlugin({
            template: './src/template.html' 
      }),
      new ExtractTextPlugin('main.css'),
  ]
}