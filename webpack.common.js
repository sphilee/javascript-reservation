const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    context: __dirname + '/src/screens',
    entry: {
        mainpage: ['./mainpage/index.js'],
        reserve: ['./reserve/index.js']
    },
    plugins: [new CleanWebpackPlugin(['dist'])],
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
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
            }
        ]
    }
};