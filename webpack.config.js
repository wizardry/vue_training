'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    // path: path.join(__dirname, 'js'),
    path: '/app/js/',
    publicPath: '/app/js/'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}