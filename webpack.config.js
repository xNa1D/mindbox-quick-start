const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/client", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "build/client"),
    filename: "bundle.js",
    chunkFilename: "chunk-[name].[contenthash].js",
  },
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, "build/client"),
    compress: true,
    port: 9000,
    proxy: {
      "/api": "http://localhost:3030",
    },
    overlay: true,
    progress: true,
    historyApiFallback: true,
    hotOnly: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: "initial",
          filename: "vendors.[contenthash].js",
          priority: 1,
          maxInitialRequests: 2, // create only one vendor file
          minChunks: 1,
        },
      },
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
    plugins: [new TsconfigPathsPlugin()],

    alias: {
      src: path.resolve(__dirname, "src/"),
      client: path.resolve(__dirname, "src/client/"),
      server: path.resolve(__dirname, "src/server/"),
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
      template: path.join(__dirname, "src/client", "index.html"),
    }),
  ],
};
