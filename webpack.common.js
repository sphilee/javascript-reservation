const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    context: __dirname + '/src/screens',
    entry: {
        mainpage: ['./mainpage/index.js'],
        reserve: ['./reserve/index.js'],
        vendor: [
            'pikaday'
        ]
    },
    plugins: [new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ],
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            options: {
                presets: ['@babel/preset-env']
            }
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