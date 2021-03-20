const path = require('path')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
}

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpuckPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd){
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpuckPlugin()
    ]
  }

  return config
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    body: `${PATHS.src}/index.js`,
  },

  output: {
  filename: '[name].bundle.js',
  path: PATHS.dist,
  },

  optimization: optimization(),
  devServer: {
    port: 7777,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: `${PATHS.src}/assets/icons`,
            to: `${PATHS.dist}/assets/icons`
          },
          {
            from: `${PATHS.src}/assets/fonts`,
            to: `${PATHS.dist}/assets/fonts`
          },
        ]
      }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/img'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts'
        }
      }
    ]
  }
};