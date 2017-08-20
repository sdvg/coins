const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    }),
    new ExtractTextPlugin('app.[chunkhash].css'),
    new AppCachePlugin({
      network: [
        '/hoodie'
      ],
      fallback: ['/ /'],
      output: 'cache.manifest',
      exclude: [/.*\.map$/]
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'ngtemplate-loader',
            options: {
              relativeTo: __dirname
            }
          },
          'html-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [autoprefixer()]
              }
            }
          ]
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /webmanifest.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              'name': '[name]_[hash].[ext]'
            }
          },
          'web-app-manifest-loader'
        ]
      }
    ]
  },

  devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    historyApiFallback: true
  },

  entry: './src/index.js',
  output: {
    filename: 'app.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
};
