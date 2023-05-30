const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// adding const WorkboxWebpackPlugin


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: { // devServer is a configuration object for webpack-dev-server // https://webpack.js.org/configuration/dev-server/
      hot: "only", // hot module replacement. Depends on HotModuleReplacementPlugin
    },
    plugins: [
      new HtmlWebpackPlugin({ // https://webpack.js.org/plugins/html-webpack-plugin/
        template: './index.html', // source html
        title: 'JATE',
      }),
      new WebpackPwaManifest({ // https://www.npmjs.com/package/webpack-pwa-manifest
        name: 'JATE',
        short_name: 'JATE',
        description: 'Another simple text editor',
        background_color: '#ffffff', // background color for app
        theme_color: '#ffffff', // theme color for app
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'), // output path
          },
        ],
      }),
      new InjectManifest({ // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
        swSrc: './src-sw.js', // source service worker
        swDest: 'src-sw.js',
      }),
    ],


    module: {
      rules: [
        {
          test: /\.css$/, // https://webpack.js.org/loaders/css-loader/
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/, // https://webpack.js.org/guides/asset-management/
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/, // https://webpack.js.org/loaders/babel-loader/
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // https://babeljs.io/docs/en/babel-preset-env
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread
            },
          },
        },


      ],
    },
  };
};

