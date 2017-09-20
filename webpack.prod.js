const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$', // embed all javascript and css inline
      inject: true,
      template: 'src/index.ejs',
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
});
