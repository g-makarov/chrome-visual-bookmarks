const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react'],
            plugins: [
              ['transform-runtime'],
              ['transform-class-properties']
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { singleton: true }
          },
          {
            loader: 'css-loader',
            options: { modules: true, minimize: true, localIdentName: '[path][name]__[local]' }
          },
          /*{
            loader: 'postcss-loader'
          }*/
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  node: {
    fs: 'empty'
  },
  watch: NODE_ENV === 'development'
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new UglifyJSPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
    /*new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
    })*/
  );
}