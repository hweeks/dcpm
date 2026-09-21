const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.tsx",
    vendor: ["react", "react-dom", "redux", "styled-components"],
  },
  output: {
    path: `${__dirname}/static`,
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    plugins: [PnpWebpackPlugin],
    fallback: { "path": require.resolve("path-browserify") }
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "-",
      name: 'dcpm',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "dcpm",
      template: "./static/index-template.html",
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
