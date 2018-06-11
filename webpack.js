const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    styles
} = require('@ckeditor/ckeditor5-dev-utils')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: __dirname + '/dist/'
    },
    context: path.resolve(__dirname, './src'),
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            // {
            //     // TODO: find a better regex
            //     test: /(\.(jpg|png|eot|woff|woff2|ttf)|icomoon.svg)$/,
            //     loader: 'file-loader'
            // },
            // {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            // },
            {
                // TODO: find a better regex => /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/ this one isn't working properly
                test: /\.svg$/,
                use: ['svg-inline-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, './src')
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                            },
                            minify: true
                        })
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.png'],
        alias: {
            assets: path.resolve(__dirname, './src/')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        })
    ]
}