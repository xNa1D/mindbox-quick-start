const path = require("path");
const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const developmentConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../build/client"),
    compress: true,
    port: 9000,
    proxy: {
      "/api": "http://localhost:3030",
    },
    overlay: true,
    progress: true,
    historyApiFallback: true,
    watchContentBase: true,
  },
};

module.exports = merge(commonConfig, developmentConfig);
