const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i, //.(css|scss)$/,
        include: path.resolve(__dirname, 'client'),
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'build'),
    },
    proxy: {
      '/login/*': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/home/*': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/register/*': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/api/*': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/hello/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
};
