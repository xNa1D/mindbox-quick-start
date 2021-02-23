const path = require("path");

module.exports = {
  entry: "./src/client/script/script.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./build/client/script/"),
    filename: "script.js",
  },
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
};
