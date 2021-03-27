const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/client", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "build/client"),
    filename: "bundle.js",
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
    plugins: [new TsconfigPathsPlugin()],

    alias: {
      src: path.resolve(__dirname, "src/"),
      client: path.resolve(__dirname, "src/client/"),
      server: path.resolve(__dirname, "src/server/"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "build/client"),
    compress: true,
    port: 9000,
    proxy: {
      "/api": "http://localhost:3030",
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
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
