// @ts-check
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
        test: /\.[jt]sx?$/i,
        sourceMap: isDevelopment,
      }),
      new OptimizeCSSAssetsPlugin({

      }),
    ],
  },
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  plugins: [
    new CompressionPlugin(),
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([
      { from: `${__dirname}/assets` },
    ],
    { ignore: ['.DS_Store', '*.css', '*.scss'] }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|ru/),
  ],
  devtool: isDevelopment ? 'source-map' : false,
  devServer: {
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              sourceMap: isDevelopment,
              hmr: isDevelopment,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              sourceMap: isDevelopment,
              hmr: isDevelopment,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
          { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
      },
    ],
  },
};
