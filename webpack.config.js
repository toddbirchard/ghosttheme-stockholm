const webpack = require('webpack');
const path = require('path');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');


module.exports = {
  mode: 'production',
  plugins: [
    new Dotenv({path: './.env'}),
    new FontConfigWebpackPlugin(),
    new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[id].css"}),
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
    'author': path.resolve(__dirname, './src/js/author.js'),
    'tag': path.resolve(__dirname, './src/js/tag.js'),
    'resources': path.resolve(__dirname, './src/js/resources.js'),
    'projects': path.resolve(__dirname, './src/js/projects.js'),
    'series': path.resolve(__dirname, './src/js/series.js'),
    'postarchive': path.resolve(__dirname, './src/js/postarchive.js'),
    'transactional': path.resolve(__dirname, './src/js/transactional.js'),
    'error': path.resolve(__dirname, './src/js/error.js')
  },
  output: {
    path: path.resolve(__dirname, './assets/js'),
    filename: '[name].js'
  },
  optimization: {
    minimizer: [new TerserPlugin()],
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
      }, /*{
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }, */{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.html$/,
        loaders: ['file-loader?name=[name].html', 'extract-loader', 'html-loader']
      }, {
        test: /\.gql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  }
}
