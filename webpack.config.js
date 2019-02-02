const webpack = require('webpack');
const path = require('path');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');


module.exports = {
  resolve: {
    alias: {
      Fonts: path.resolve(__dirname, './assets/fonts/'),
      Less: path.resolve(__dirname, './src/less/'),
      PostsJS: path.resolve(__dirname, 'src/js/posts/')
    }
  },
  entry: {
    'global': path.resolve(__dirname, './webpack/index.js'),
    'posts': path.resolve(__dirname, './webpack/posts.js'),
    'pages': path.resolve(__dirname, './webpack/pages.js'),
    'apply': path.resolve(__dirname, './webpack/apply.js'),
    'author': path.resolve(__dirname, './webpack/author.js'),
    'resources': path.resolve(__dirname, './webpack/resources.js'),
  },
  output: {
    path: path.resolve(__dirname, './assets/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: [ { loader: 'file-loader', options: { name: './assets/fonts/[name].[ext]', publicPath: '/', } } ] },
      { test: /\.m?js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } }
    ]
  },
  plugins: [
        new FontConfigWebpackPlugin()
    ]
  }
