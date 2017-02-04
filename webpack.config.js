const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// vendor libs get bundled separately to take advantage of browser caching
const VENDOR_LIBS = [
  'classnames',
  'es6-promise',
  'isomorphic-fetch',
  'leaflet-draw',
  'moment',
  'normalize-scss',
  'query-string',
  'react',
  'react-collapse',
  'react-copy-to-clipboard',
  'react-datepicker',
  'react-dom',
  'react-height',
  'react-moment-proptypes',
  'react-motion',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-logger',
  'redux-responsive',
  'redux-thunk',
  'single-line-string',
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
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: "css-loader?sourceMap!sass-loader?sourceMap",
          fallbackLoader: 'style-loader',
        }),
        test: /\.scss$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 4000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
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
