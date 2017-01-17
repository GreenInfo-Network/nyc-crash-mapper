const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'classnames',
  'leaflet',
  'react',
  'react-dom',
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
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: "css-loader?sourceMap!sass-loader?sourceMap",
          fallbackLoader: 'style-loader',
        }),
        test: /\.scss$/
      }
    ]
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
