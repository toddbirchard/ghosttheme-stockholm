const webpack = require('webpack');
const path = require('path');

module.exports =  {
  entry: {
    'global': './index.js',
    'posts': './posts.js'
    },
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: '[name].js',
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
