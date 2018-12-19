const path = require('path');

const conf = {

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/',
  },
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    compress: true,
    //contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
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
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ],
  },
};

module.exports = conf;
