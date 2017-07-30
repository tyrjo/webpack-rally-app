const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/, exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader',
                ]
            },
            {test: /\.html/, exclude: /node_modules/, loader: 'file-loader?name=[name].[ext]'}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        overlay: {
            errors: true,
            warnigns: true
        }
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};