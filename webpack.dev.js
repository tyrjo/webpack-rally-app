const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
