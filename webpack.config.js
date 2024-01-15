const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/main.js',
    detail: './src/js/detail.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new DotenvPlugin({
      path: './.env',
      sample: './.env.default'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/main.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: './src/html/detail.html',
      chunks: ['detail']
    }),
    new MiniCssExtractPlugin()
  ]
};
