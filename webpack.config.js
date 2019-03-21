const webpack = require('webpack');
const path = require('path');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');


module.exports = {
  mode: 'production',
  plugins: [
    new Dotenv({path: './.env'}),
    new FontConfigWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  new HtmlMinifierPlugin({})
],
  resolve: {
    alias: {
      Fonts: path.resolve(__dirname, './assets/fonts/'),
      Less: path.resolve(__dirname, './src/less/')
    }
  },
  entry: {
    'global': path.resolve(__dirname, './src/js/global.js'),
    'posts': path.resolve(__dirname, './src/js/posts.js'),
    'pages': path.resolve(__dirname, './src/js/pages.js'),
    'apply': path.resolve(__dirname, './src/js/apply.js'),
    'author': ["@babel/polyfill", path.resolve(__dirname, './src/js/author.js')],
    'resources': path.resolve(__dirname, './src/js/resources.js'),
    'projects': ["@babel/polyfill", path.resolve(__dirname, './src/js/projects.js')],
    'series': path.resolve(__dirname, './src/js/series.js'),
    'transactional': path.resolve(__dirname, './src/js/transactional.js')
  },
  output: {
    path: path.resolve(__dirname, './assets/js'),
    filename: '[name].js'
  },
  optimization: {
    minimizer: [
       new UglifyJsPlugin({
         cache: true,
         parallel: true,
         sourceMap: true // set to true if you want JS source maps
       })
     ]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './assets/js'
            }
          },
          "css-loader"
        ]
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/fonts/[name].[ext]',
              publicPath: '/'
            }
          }
        ]
      }, {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.html$/, loaders: ['file-loader?name=[name].html', 'extract-loader', 'html-loader'] },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  }
}
