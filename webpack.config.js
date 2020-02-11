/**
 * Created by easterCat on 2017/10/30.
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")]
    },
    entry: path.resolve(__dirname, "src/app.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js"
    },
    devtool: "cheap-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
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
        port: 6973, //监听端口6973
        host: "localhost",
        hot: true, //热替换
        open: true
    },
    plugins: [new HtmlWebpackPlugin(), new BundleAnalyzerPlugin()]
};
