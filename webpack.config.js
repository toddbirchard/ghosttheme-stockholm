/*const webpack = require('webpack');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const autoprefixer = require("autoprefixer");
const path = require('path');

module.exports = {
  mode: 'production',
  resolve: {
    alias: {
      Fonts: path.resolve(__dirname, '/assets/fonts/'),
      Less: path.resolve(__dirname, '/src/less/')
    }
  },
  entry: {
    'global': './index.js',
    'posts': './posts.js',
    'pages': './pages.js',
    'apply': './apply.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: '[name].js',
    publicPath: './'
  },
  plugins: [
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
    new FontConfigWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
          use: [
            "css-loader", {
              loader: "postcss-loader",
              options: {
                plugins: () => autoprefixer({
                  browsers: ["last 3 versions", "> 1%"]
                })
              }
            },
            "less-loader"
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}*/

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
