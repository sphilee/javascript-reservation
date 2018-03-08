module.exports = {
    context: __dirname + '/src',
    entry: {
        mainpage: ['./mainpage.js'],
        reserve: ['./reserve.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\-tpl.html$/,
                loader: 'handlebars-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    presets: ['@babel/preset-env'],
                    compact: true
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
    },
    devtool: '#inline-source-map'
};