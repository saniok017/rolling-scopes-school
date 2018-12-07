const path = require('path');

const conf = {

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/',
  },

  devServer: {
    overlay: true,
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
            ],
          },
        },
        exclude: '/node_modules',
      },
    ],
  },
};

module.exports = conf;
