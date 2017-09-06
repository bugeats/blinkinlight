'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageData = require('./package.json');

const DIST_PATH = path.resolve(__dirname, 'dist');
const PACKAGE_NAME = packageData.name;

module.exports = {
    entry: [
        './src/entry.js'
    ],
    output: {
        filename: `${ PACKAGE_NAME }.bundle.js`,
        path: DIST_PATH,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['es2015', { modules: false }],
                        'react'
                    ],
                    plugins: []
                }
            }, {
                test: /\.html$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: DIST_PATH,
        historyApiFallback: true,
        overlay: true,
        port: 8999,
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            buildDate: (new Date()).toISOString(),
            env: process.env,
            hash: true,
            packageData: packageData,
            showErrors: true,
            template: 'src/index.html.ejs',
            title: 'Blinkinlight Dev Harness'
        })
    ]
};
