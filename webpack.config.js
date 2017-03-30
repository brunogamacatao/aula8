var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './client/js/app.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlPlugin({
      template: 'client/index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /client\/js/,
        loaders: ['babel-loader']
      }
    ]
  }
};