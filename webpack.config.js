const webpack = require('webpack');
const path = require('path');
const bundle = require('bundle-loader');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
  mode: 'production',
  plugins: [
        new FontConfigWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
    ],
  resolve: {
    alias: {
      Fonts: path.resolve(__dirname, './assets/fonts/'),
      Less: path.resolve(__dirname, './src/less/'),
      PostsJS: path.resolve(__dirname, 'src/js/posts/')
    }
  },
  entry: {
    'global': path.resolve(__dirname, './webpack/global.js'),
    'posts': path.resolve(__dirname, './webpack/posts.js'),
    'pages': path.resolve(__dirname, './webpack/pages.js'),
    'apply': path.resolve(__dirname, './webpack/apply.js'),
    'author': path.resolve(__dirname, './webpack/author.js'),
    'resources': path.resolve(__dirname, './webpack/resources.js'),
    'projects': path.resolve(__dirname, './webpack/projects.js'),
  },
  output: {
    path: path.resolve(__dirname, './assets/dist'),
    filename: '[name].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: [ { loader: 'file-loader', options: { name: './assets/fonts/[name].[ext]', publicPath: '/', } } ] },
      { test: /\.m?js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
      { test: /\.bundle\.js$/, use: 'bundle-loader' }
    ]
  },

  }
