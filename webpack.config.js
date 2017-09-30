const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractScssPlugin = new ExtractTextPlugin('styles.bundle.css');

module.exports = {
    entry: './public/js/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [['es2015', {modules:false}], 'react', 'stage-1'],
                    // presets: ['es2015', 'react', 'stage-1'],
                    plugins: ['transform-decorators-legacy']
                },
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader' // compiles SASS to CSS
                    }
                ])
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        extractScssPlugin
    ],
    stats: {
        colors: true
    },
    devtool: 'inline-source-map'    // TODO: remove this for production builds
};