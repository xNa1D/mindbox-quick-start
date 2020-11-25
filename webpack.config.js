const path = require("path");

module.exports = {
  entry: "./src/client/script/script.ts",
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
        exclude: [path.resolve(__dirname, "./src/server/**/*"), /node_modules/],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "./src/client/script/"),
  },
};
