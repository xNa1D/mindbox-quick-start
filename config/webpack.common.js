import { resolve as _resolve, join } from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import { ProvidePlugin } from "webpack";

export const entry = _resolve(__dirname, "../src/client", "index.tsx");
export const target = "web";
export const output = {
  path: _resolve(__dirname, "../build/client"),
  filename: "[name].[contenthash].js",
  chunkFilename: "chunk-[name].[contenthash].js",
};
export const resolve = {
  extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
  // fallback: { "assert": require.resolve("assert/") },
  alias: {
    src: _resolve(__dirname, "../src/"),
    client: _resolve(__dirname, "../src/client/"),
    server: _resolve(__dirname, "../src/server/"),
  },
  fallback: {
    assert: require.resolve("assert/"),
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
    template: join(__dirname, "../src/client", "index.html"),
  }),
  new ProvidePlugin({
    process: "process/browser",
  }),
];
