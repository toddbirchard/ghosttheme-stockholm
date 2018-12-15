const path = require('path');

module.exports = {
  entry: './src/webpack/index.js',
  output: {
    path: path.resolve(__dirname, 'assets/webpack'),
    filename: 'my-webpack.bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
    stats: {
        colors: true
    }
};
