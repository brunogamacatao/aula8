var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/js/app.js',
  output: {
    path: './build',
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