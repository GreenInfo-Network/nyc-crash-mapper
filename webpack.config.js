const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'classnames',
  'react',
  'react-dom',
  'react-router',
  'query-string',
  'react-collapse',
  'react-height',
  'react-motion',
  'react-redux',
  'redux',
  'redux-responsive',
  'redux-logger',
  'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ],
        include: path.resolve(process.cwd(), 'src'),
        options: {
          fix: true,
        },
        exclude: /node_modules/
      },
      // {
      //   use: 'babel-loader',
      //   test: /\.js$/,
      //   exclude: /node_modules/
      // },
      {
        loader: ExtractTextPlugin.extract({
          loader: "css-loader?sourceMap!sass-loader?sourceMap",
          fallbackLoader: 'style-loader',
        }),
        test: /\.scss$/
      }
    ]
  },
  watch: true,
  watchOptions: {
    poll: 1000
  },
  devServer: {
    watchContentBase: true,
    lazy: false,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HTMLWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
