/**
 * Created by easterCat on 2017/10/30.
 */
const path = require('path');

module.exports = {
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'), //打包的文件夹
        filename: 'index.js'
    },
    devtool: 'cheap-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }]
            },
            {
                test: /index\.html/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return '[name].[ext]'
                        }
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: './dist',//为一个目录下的文件提供本地服务器，在这里设置其所在目录
        historyApiFallback: true,//跳转将指向index.html
        port: 3333//设置监听端口4333
    }
};