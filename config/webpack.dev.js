const path = require("path");
const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const developmentConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../build/client"),
    },
    hot: true,
    liveReload: false,
    port: 9000,
    proxy: {
      "/api": "http://localhost:3030",
    },
    client: {
      overlay: true,
      progress: true,
    },
    historyApiFallback: true,
    // watchContentBase: true,
  },
};

module.exports = merge(commonConfig, developmentConfig);
