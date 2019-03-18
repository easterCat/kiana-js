/**
 * Created by easterCat on 2017/10/30.
 */
const path = require("path");

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")]
    },
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    devtool: "cheap-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /index\.html/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name(file) {
                                return "[name].[ext]";
                            }
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: "./src", //提供本地服务器
        historyApiFallback: true, //跳转index.html
        port: 3333, //监听端口3333
        host: "192.168.0.139",
        hot: true, //热替换
        open: true
    }
};
