/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "../src/client", "index.tsx"),
  target: "web",
  output: {
    path: path.resolve(__dirname, "../build/client"),
    filename: "[name].[contenthash].js",
    chunkFilename: "chunk-[name].[contenthash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
    // fallback: { "assert": require.resolve("assert/") },
    alias: {
      src: path.resolve(__dirname, "../src/"),
      client: path.resolve(__dirname, "../src/client/"),
      server: path.resolve(__dirname, "../src/server/"),
    },
    fallback: {
      assert: require.resolve("assert/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [path.resolve(__dirname, "./src/server/**/*"), /node_modules/],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "../src/client", "index.html"),
    }),
    new ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
