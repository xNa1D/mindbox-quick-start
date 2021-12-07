import { join } from "path";
import { merge } from "webpack-merge";

import commonConfig from "./webpack.common";

const developmentConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: join(__dirname, "../build/client"),
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

export default merge(commonConfig, developmentConfig);
