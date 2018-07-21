const path = require('path');
const webpack = require('webpack');

const DEVELOPMENT_MODE = 'development';
const PRODUCTION_MODE = 'production';
const NODE_ENV = process.env.NODE_ENV || DEVELOPMENT_MODE;

const APP_PATH = 'src/';
const DIST_PATH = 'public/';

const plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV),
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
];

module.exports = {
  context: path.resolve(__dirname, APP_PATH),
  entry: {
    bundle: './main',
  },
  output: {
    path: path.resolve(__dirname, DIST_PATH),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, APP_PATH),
    }
  },
  mode: NODE_ENV,
  optimization: {
    nodeEnv: NODE_ENV,
    minimize: NODE_ENV === PRODUCTION_MODE,
    concatenateModules: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: { singleton: true },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true,
              localIdentName: NODE_ENV === PRODUCTION_MODE ? '[hash:base64]' : '[local]--[path][name]',
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  devtool: NODE_ENV === DEVELOPMENT_MODE ? 'cheap-module-eval-source-map' : false,
  plugins,
  devServer: {
    contentBase: path.join(__dirname, DIST_PATH),
    compress: false,
    port: 9000,
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
  },
  node: {
    fs: 'empty'
  },
};