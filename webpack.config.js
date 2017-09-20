const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      { test: /\.html/, exclude: /node_modules/, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
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
      inlineSource: '.(js|css)$', // embed all javascript and css inline
      inject: true,
      template: 'src/index.ejs',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
