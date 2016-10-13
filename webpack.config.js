var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var common = {
  cache: true,
  debug: true,
  entry: {
    index: './src/main/web/js/index.jsx',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './src/main/webapp/js/',
    filename: '[name].js',
  },
  devServer: {
    inline: true
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.s[a|c]ss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    }, {
      test: /\.woff$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
    }, {
      test: /\.(eot|ttf|svg|gif|png)$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  postcss: function() {
    return [autoprefixer({
      browsers: ['last 4 versions']
    })];
  }
};

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true
  },
  output: {
    publicPath: 'http://localhost:8090/assets'
  },
  plugins: [
    new NpmInstallPlugin({
      save: true // --save
    })
  ]
});
