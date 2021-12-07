import { resolve as _resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export const entry = _resolve(__dirname, "src/client", "index.tsx");
export const output = {
  path: _resolve(__dirname, "build/client"),
  filename: "bundle.js",
  chunkFilename: "chunk-[name].[contenthash].js",
};
export const target = "web";
export const devServer = {
  contentBase: join(__dirname, "build/client"),
  compress: true,
  port: 9000,
  proxy: {
    "/api": "http://localhost:3030",
  },
  overlay: true,
  progress: true,
  historyApiFallback: true,
  hotOnly: true,
};
export const optimization = {
  minimize: true,
  splitChunks: {
    cacheGroups: {
      vendors: {
        test: /node_modules/,
        chunks: "initial",
        filename: "vendors.[contenthash].js",
        priority: 1,
        maxInitialRequests: 2,
        minChunks: 1,
      },
    },
  },
};
export const resolve = {
  extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
  plugins: [new TsconfigPathsPlugin()],

  alias: {
    src: _resolve(__dirname, "src/"),
    client: _resolve(__dirname, "src/client/"),
    server: _resolve(__dirname, "src/server/"),
  },
};
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: [_resolve(__dirname, "./src/server/**/*"), /node_modules/],
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
};
export const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: join(__dirname, "src/client", "index.html"),
  }),
];
