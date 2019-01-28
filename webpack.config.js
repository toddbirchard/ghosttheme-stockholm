const webpack = require('webpack');
const path = require('path');
const FontConfigWebpackPlugin = require('font-config-webpack-plugin');
const resolve = require('path').resolve;

module.exports = {
  resolve: {
    alias: {
      Fonts: resolve(__dirname, '/assets/fonts/'),
      Less: resolve(__dirname, '/src/less/')
    }
  },
  entry: {
    'global': './index.js',
    'posts': './posts.js',
    'pages': './pages.js',
    'apply':'./apply.js',
  },
  output: {
    path: resolve(__dirname, '/assets/dist'),
    filename: '[name].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/fonts/[name].[ext]',
              publicPath: '/',
            }
          }
        ]
      }
    ]
  },
  plugins: [
        new FontConfigWebpackPlugin()
    ]
}
/*
module.exports = {
  entry: {
    global: '.src/webpack/global.js',
    posts: '.src/webpack/posts.js',
    authors: '.src/webpack/authors.js',
    pages: '.src/webpack/pages.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets/dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
};

/*module.exports = config;*/
