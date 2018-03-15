const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        mainpage: ['./src/mainpage/index.js'],
        reserve: ['./src/reserve/index.js'],
        vendor: [
            'pikaday', 'lodash.throttle'
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new HtmlWebpackPlugin({
          chunks: ['mainpage','common','vendor'],
          template: './src/mainpage/index.html',
          filename: 'mainpage/index.html'
        }),
        new HtmlWebpackPlugin({
          chunks: ['reserve','common','vendor'],
          template: './src/reserve/index.html',
          filename: 'reserve/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/
        }, {
            test: /test\.js$/,
            use: 'mocha-loader',
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10000
            }
        }]
    }
};